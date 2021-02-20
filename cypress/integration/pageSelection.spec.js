import { articleCategories } from '../../src/sources/Categories.js'

describe('Sidebar page navigation and selection', () => {
  it('Correctly displays the sidebar with the designated categories', () => {
    // Check if the categories match up with the Categories.js file
    cy.visit('http://localhost:3000/')
    cy.get('button[cy-data="drawerButton"]')
      .click()

    for (let i = 0; i < articleCategories.length; i++) {
      cy.get('div[cy-data="sideBarCategory"]').eq(i).invoke('text')
        .then(text => {
          expect(text).to.eq(articleCategories[i])
        })
    }

  })
  it('Successfully navigates between each section and displays the data, with successful API requests', () => {
    // Go through each page and navigate
    cy.visit('http://localhost:3000/')
    cy.get('button[cy-data="drawerButton"]')
      .click()

      // Arts category
      cy.get('div[cy-data="sideBarCategory"]').contains('Arts').click()
      cy.wait(500)
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
        .should('have.attr', 'href')
          .and('include', 'https://www.nytimes.com/')
          .and('include', '/arts/')

      // Fashion category
      cy.get('div[cy-data="sideBarCategory"]').contains('Fashion').click()
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
      .should('have.attr', 'href')
        .and('include', 'https://www.nytimes.com/')
        .and('include', '/style/')

      // Food category
      cy.get('div[cy-data="sideBarCategory"]').contains('Food').click()
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
        .should('have.attr', 'href')
          .and('include', 'https://www.nytimes.com/')
          .and('include', '/dining/')

      // Health category
      cy.get('div[cy-data="sideBarCategory"]').contains('Health').click()
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
      .should('have.attr', 'href')
        .and('include', 'https://www.nytimes.com/')
        .and('include', '/health/')

      // Movies category
      cy.get('div[cy-data="sideBarCategory"]').contains('Movies').click()
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
      .should('have.attr', 'href')
        .and('include', 'https://www.nytimes.com/')
        .and('include', '/movies/')

      // Theater category
      cy.get('div[cy-data="sideBarCategory"]').contains('Theater').click()
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
      .should('have.attr', 'href')
        .and('include', 'https://www.nytimes.com/')
        .and('include', '/theater/')

      // Travel category
      cy.get('div[cy-data="sideBarCategory"]').contains('Travel').click()
      cy.get('div[cy-data="articleCard"]').eq(0).find('a')
      .should('have.attr', 'href')
        .and('include', 'https://www.nytimes.com/')
  })
})