import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// TEST OPTIONS EXPLANATION:
// executor: https://k6.io/docs/using-k6/scenarios/#scenario-executors
// rate 1 timeUnit 1 Means rate: 1, timeUnit: '1s' means "try to start 1 iteration every second"
// duration: Run test for this duration
// maxVus: Stop test if this is reached
// Pre-allocated vus loads a number of iterations into memory before the test starts to ensure consistent reporting

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 5,
      timeUnit: "1s",
      duration: "15s",
      preAllocatedVUs: 20,
      maxVUs: 1000,
    },
  },
};

// Specify Key URLS to HTTP Request Here:
const home = "http://127.0.0.1:3030/";
//const home = 'https://acebook-main.onrender.com/';
const signUp = home + "users/new";
const signIn = home + "sessions/new";
const usersUrl = home + "users/";
const newPost = home + "posts/new";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

// THIS IS THE SCENARIO THAT WILL BE EXECUTED PER ITERATION

export default function () {
  // Helper Method to Make a Random String
  function generateRandomString() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 8; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)];
    }
    return randomString;
  }

  // SCENARIO:
  // 1) Visit Home
  // 2) Visit signUp
  // 3) Create Account
  // 4) Log In

  // Create Random user
  let randUser = `user${generateRandomString()}`;
  let body =
    "username=" +
    randUser +
    "%40test.com&email=" +
    randUser +
    "%40test.com&password=$" +
    randUser;

  // Sign Up
  http.get(home);
  http.get(signUp);
  const thisPost = http.post(usersUrl, body, { headers: headers });

  // Account Creation Reporting Block
  if (thisPost.status == "200") {
    console.log("Response Code:", thisPost.status);
    console.log(`${randUser} Account Created`);
  } else {
    console.log("Response Code:", thisPost.status);
    console.log(`${randUser} Account Creation Failed`);
  }

  // // Sign In
  // http.get(newPost);

  // // Make a Post
  // http.get(newPost);
}

// THIS FUNCTION GENERATES A SUMMARY REPORT AS HTML
export function handleSummary(data) {
  return {
    "K6/CreateAccountSummary.html": htmlReport(data),
  };
}

// TO EXECUTE TEST: k6 run K6CreateAccount.js
// TO EXECUTE WITH OPTIONAL CSV DATA: 6 run --out csv=<CSVFILENAME>.csv K6CreateAccount.js
