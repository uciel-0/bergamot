describe("Scenario where call is made and no data is returned", () => {
    beforeEach(() => {
        cy.server();
        cy.fixture('bad/500-internal-server-error').as('500Response');
        cy.route('GET', '/api/search/events?keyword=new+york+yankees', '@500Response').as('getEventsFailed')
    });

    it('should visit bop', () => {
        cy.visit('/');        
    });

    it('should respond to front end request with error 500', () => {
        cy.get('[data-test=search-bar]').type('new york yankees{enter}');
        cy.wait('@getEventsFailed');
    });
});
