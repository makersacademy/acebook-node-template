describe("post view", () => {
  it("sorts posts by newest first", () => {
    document.body.innerHTML = fs.readFileSync("././views/posts/index.hbs");
    new Post({ message: "hi" });
    new Post({ message: "hi2" });
    new Post({ message: "hi3" });

    const posts = document.querySelectorAll("posts");
    console.log(posts);
    expect(posts[0]).toEqual("hi3");
  });
});
