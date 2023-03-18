describe('Smoke tests', () => {
  const TEST_WORD = 'TESTWORD';

  it('Add button should be disabled for empty input', () => {
    cy.intercept(`${Cypress.config('backendBaseURL')}/words?search=&limit=10&page=1`).as('getWords');
    cy.visit('/');
    cy.wait('@getWords');
    cy.get('[data-testid=add-word-button]').should('be.visible');
  });

  it('Add and delete new word', () => {
    cy.visit('/');

    // add word
    cy.get('[data-testid=input-origin]').type(TEST_WORD);
    cy.get('[data-testid=input-translation]').type('футбол');
    cy.contains('No words');

    cy.get('[data-testid=add-word-button]').click();
    cy.contains(TEST_WORD);

    //  delete word data
    cy.get('[data-testid=input-origin]').type(TEST_WORD);
    cy.get('.el-table__row button').click();
    cy.should('not.contain', TEST_WORD);
  });

  it('Visit word page', () => {
    cy.visit('/');

    // add word
    cy.get('[data-testid=input-origin]').type(TEST_WORD);
    cy.get('[data-testid=input-translation]').type('футбол');

    cy.get('[data-testid=add-word-button]').click();
    cy.contains(TEST_WORD).click();
    cy.url().should('include', TEST_WORD);
  });

});
