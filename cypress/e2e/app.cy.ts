describe("Suggestion page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/suggestions");
  });

  it("should display 6 suggestions at first", () => {
    // check if there are 6 elements with class 'sugg-item'
    cy.get(".sugg-item").should("have.length", 6);
  });

  it("should not present any suggestion after clicking the element with 'sidebar-item' class and 'UI' text in it", () => {
    cy.get(".sidebar-item").contains("UI").click();

    cy.get(".sugg-item").should("have.length", 0);
  });

  it("should present one suggestion after clicking the element with 'sidebar-item' class and 'Bug' text in it", () => {
    cy.get(".sidebar-item").contains("Bug").click();

    cy.get(".sugg-item").should("have.length", 1);
  });

  it("should sort the suggestions by least upvotes after clicking [data-cy=dropdown] and selecting 'Least Upvotes'", () => {
    cy.get(".sugg-item").first().contains("112");

    cy.get("#toggle-dropdown").click();
    cy.get("[data-cy=dropdown]").contains("Least Upvotes").click();

    cy.get(".sugg-item").first().contains("3");
  });

  it("should navigate to /new route after clicking the Link with 'Add Feedback' text", () => {
    cy.contains("Add Feedback").click();

    cy.url().should("include", "/new");
  });

  it("should navigate to /roadmap route after clicking the a element with 'view' text", () => {
    cy.contains("View").click();

    cy.url().should("include", "/roadmap");
  });

  it("should display li elements with numbers 2,3,1 respectively", () => {
    cy.get("[data-cy=roadmap-ul]").get("li").first().contains("2");
    cy.get("[data-cy=roadmap-ul]").get("li").eq(1).contains("3");
    cy.get("[data-cy=roadmap-ul]").get("li").eq(2).contains("1");
  });
});

describe("New suggestion page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/new");
  });

  it("should add red border to inputs", () => {
    cy.get("input").should("not.have.class", "border-red-500");
    cy.get("textarea").should("not.have.class", "border-red-500");
    cy.contains("Add Feedback").click();
    cy.get("input").should("have.class", "border-red-500");
    cy.get("textarea").should("have.class", "border-red-500");
  });

  it("should display two 'Can't be empty' text when inputs are empty", () => {
    cy.contains("Add Feedback").click();
    cy.get("[data-cy=error-p]").should("have.length", 2);
  });

  it("should remove 'Can't be empty' text and 'border-red-500' class on the INPUT", () => {
    cy.contains("Add Feedback").click();
    cy.get("[data-cy=error-p]").first().should("be.visible");
    cy.get("input").should("have.class", "border-red-500");

    cy.get("input").first().type("test");

    cy.get("[data-cy=error-p]").first().should("not.be.visible");
    cy.get("input").should("not.have.class", "border-red-500");
  });

  it("should remove 'Can't be empty' text and 'border-red-500' class on the TEXTAREA", () => {
    cy.contains("Add Feedback").click();
    cy.get("[data-cy=error-p]").eq(1).should("be.visible");
    cy.get("textarea").should("have.class", "border-red-500");

    cy.get("textarea").first().type("test");

    cy.get("[data-cy=error-p]").eq(1).should("not.be.visible");
    cy.get("textarea").should("not.have.class", "border-red-500");
  });

  it("should close the dropdown with dataset of 'dropdown' after clicking outside of it", () => {
    cy.get("#toggle-dropdown").click();
    cy.get("[data-cy=dropdown]").should("exist");
    cy.get("body").click();
    cy.wait(1000);
    cy.get("[data-cy=dropdown]").should("not.exist");
  });

  it("should display 'UI' text after clicking the element with 'dropdown-item' class and 'UI' text in it", () => {
    cy.get("#toggle-dropdown").click();
    cy.get("[data-cy=dropdown]").contains("UI").click();
    cy.wait(1000);
    cy.get("[data-cy=dropdown]").should("not.exist");
    cy.get("#toggle-dropdown").contains("UI");
  });

  it("should add new suggestion with title 'Fake Test title' and description 'Lorem ipsum dolor sit amet.'", () => {
    cy.get("input").first().type("Fake Test title");
    cy.get("textarea").first().type("Lorem ipsum dolor sit amet.");
    cy.get("#toggle-dropdown").click();
    cy.get("[data-cy=dropdown]").contains("UX").click();
    cy.contains("Add Feedback").click();

    cy.wait(2000);

    cy.get(".sugg-item").last().contains("Fake Test title");
    cy.get(".sugg-item").last().contains("Lorem ipsum dolor sit amet.");
    cy.get(".sugg-item").last().contains("ux");
  });

  it("should navigate to /suggestions route after clicking the Link with Cancel text", () => {
    cy.contains("Cancel").click();

    cy.url().should("include", "/suggestions");
  });
});

describe("Details page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/suggestions/2");
  });

  it("should display 'Add A Dark Theme Option' title", () => {
    cy.contains("a dark theme option");
  });

  it("should add red border to textarea if it is empty when clicked 'Post Comment'", () => {
    cy.get("textarea").should("not.have.class", "border-red-500");
    cy.contains("Post Comment").click();
    cy.get("textarea").should("have.class", "border-red-500");
  });

  it("should remove red border and 'Can't be empty' text after typing in textarea", () => {
    cy.contains("Post Comment").click();
    cy.get("textarea").should("have.class", "border-red-500");
    cy.get("[data-cy=error-p]").should("be.visible");
    cy.get("textarea").type("test");
    cy.get("textarea").should("not.have.class", "border-red-500");
    cy.get("[data-cy=error-p]").should("not.be.visible");
  });

  it("should add new comment with text 'Lorem ipsum dolor sit amet.'", () => {
    cy.get("textarea").type("Lorem ipsum dolor sit amet.");
    cy.contains("Post Comment").click();
    cy.get("article").last().contains("Lorem ipsum dolor sit amet.");
  });

  it("should open comment input after clicking 'reply' button", () => {
    cy.get("[data-cy=comment]").should("not.exist");
    cy.contains("Reply").click();
    cy.get("[data-cy=comment]").should("exist");
  });

  it("comment input should add 'border-red-500' if it's empty", () => {
    cy.contains("Reply").click();
    cy.get("[data-cy=comment]");
    cy.contains("Post Reply").click();
    cy.get("[data-cy=comment]").should("have.class", "border-red-500");
    cy.contains("Can't be empty").should("be.visible");
  });

  it("should remove 'border-red-500' and 'Can't be empty' text after typing in comment input", () => {
    cy.contains("Reply").click();
    cy.get("[data-cy=comment]");
    cy.contains("Post Reply").click();
    cy.get("[data-cy=comment]").should("have.class", "border-red-500");
    cy.contains("Can't be empty").should("be.visible");
    cy.get("[data-cy=comment]").type("test");
    cy.get("[data-cy=comment]").should("not.have.class", "border-red-500");
    cy.contains("Can't be empty").should("not.be.visible");
  });

  it("should add new reply with text 'Lorem ipsum dolor sit amet.' below second article element", () => {
    cy.get("[data-cy=reply-btn]").eq(1).click();
    cy.get("[data-cy=comment]").type("Lorem ipsum dolor sit amet.");
    cy.contains("Post Reply").click();
    cy.get("article").eq(1).contains("Lorem ipsum dolor sit amet.");
  });

  it("should reply to the reply with text 'Lorem ipsum dolor sit amet.'", () => {
    cy.get("[data-cy=reply-item]").eq(1).contains("Reply").click();
    cy.get("textarea").first().type("Fake reply text");
    cy.contains("Post Reply").click();
  });
});

describe("Edit page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/suggestions/1/edit");
  });

  it("should display 'Add tags for solutions", () => {
    cy.contains("Add tags for solutions");
  });

  it("should add red border to the first input if it is empty when clicked 'Save changes'", () => {
    cy.get("input").first().should("not.have.class", "border-red-500");
    // empty the first input
    cy.get("input").first().clear();

    cy.contains("Save Changes").click();
    cy.get("input").first().should("have.class", "border-red-500");
  });

  it("should change title of the suggestion", () => {
    cy.get("input").first().clear();
    cy.get("input").first().type("Fake title");
    cy.contains("Save Changes").click();
    cy.get(".sugg-item").first().contains("Fake title");
  });

  it("should open dropdown, change selected item, and check it", () => {
    cy.get("#toggle-dropdown2").click();
    cy.get("[data-cy=dropdown]").should("exist");
    cy.get("[data-cy=dropdown]").contains("Live").click();
    cy.contains("Save Changes").click();

    cy.contains("Fake title").should("not.exist");
  });

  it("should remove the suggestion", () => {
    cy.visit("http://localhost:3000/suggestions");
    cy.get(".sugg-item").eq(4).contains("Preview images not loading");
    cy.get(".sugg-item").eq(4).click();
    cy.contains("Edit Feedback").click();
    cy.contains("Delete").click();
    cy.get(".sugg-item")
      .eq(4)
      .contains("Preview images not loading")
      .should("not.exist");
  });
});

describe("Roadmap page", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/roadmap");
  });

  it("should navigate to /roadmap route after clicking the Link with 'View' text", () => {
    cy.visit("http://localhost:3000/suggestions");
    cy.contains("View").click();

    cy.url().should("include", "/roadmap");
  });

  it("should display 'Roadmap' text", () => {
    cy.contains("Roadmap");
  });

  it("should navigate to /new route after clicking the Link with 'Add Feedback' text", () => {
    cy.contains("Add Feedback").click();

    cy.url().should("include", "/new");
  });

  it("should navigate to details page after clicking an element with data-cy=roadmap-item", () => {
    cy.get("[data-cy=roadmap-item]").first().click();
    cy.contains("More comprehensive reports");
  });

  it("should add red border to textarea if it's empty when clicked 'Post Comment'", () => {
    cy.get("[data-cy=roadmap-item]").first().click();
    cy.contains("Post Comment").click();
    cy.get("textarea").should("have.class", "border-red-500");

    cy.get("textarea").type("Lorem ipsum dolor sit amet.");
    cy.get("textarea").should("not.have.class", "border-red-500");
  });

  it("should navigate to details page and add a new comment", () => {
    cy.get("[data-cy=roadmap-item]").first().click();
    cy.contains("More comprehensive reports");

    cy.get("textarea").type("Lorem ipsum dolor sit amet.");
    cy.contains("Post Comment").click();
    cy.contains("Lorem ipsum dolor sit amet.");
  });

  it("should navigate to details page and add a new reply to a comment", () => {
    cy.get("[data-cy=roadmap-item]").first().click();
    cy.contains("More comprehensive reports");

    cy.get("[data-cy=reply-btn]").first().click();
    cy.get("textarea").first().type("Fake reply hoo hoo");
    cy.contains("Post Reply").click();
    cy.contains("Fake reply hoo hoo");
  })
});

export {};
