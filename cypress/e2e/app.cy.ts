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

  it.only("should sort the suggestions by least upvotes after clicking [data-cy=dropdown] and selecting 'Least Upvotes'", () => {
    cy.get("#toggle-dropdown").click();
    cy.get("#toggle-dropdown").contains("Least Upvotes").click();

    cy.get(".sugg-item").first().contains("UI");
  });
});

export {};
