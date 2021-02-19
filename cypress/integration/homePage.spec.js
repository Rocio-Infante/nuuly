describe('HomePage functionality testing', () => {
  it('Correctly renders the home page on page load', () => {
    // Check if the home page has the correct styling
    cy.visit('http://localhost:3000/')
    cy.get('h4[cy-data="homePageTitle"]')
      .should('be.visible')
      .should('have.text', 'Nuuly News')
  })
  it('Renders articles from the /home NY Times API', () => {
    // Get articles, length should match the NY Times API
    cy.visit('http://localhost:3000/')

    cy.request(Cypress.env("NYT_HOME"))
      .then((response) => {
        console.log(response)
        expect(response.status).to.equal(200)
        cy.get('div[cy-data="articleCard"]').should('have.length', response.body.num_results)
      })
  })
})