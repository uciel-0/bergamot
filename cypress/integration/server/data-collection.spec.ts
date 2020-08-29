describe("Bulk search data collection", () => {
    beforeEach(() => {
        cy.server();
        cy.route('GET','/api/search/events').as('getEvents');
    });
    // our backend calls resolve too fast - we'll have to get our data via direct xhr calls to our api
    it('should make a direct call to bop api for drake data', () => {
        cy.request('GET','http://localhost:8080/api/search/events?keyword=drake').then(response => {
            cy.writeFile('cypress/fixtures/good/drake.json', response)
        });
    });

    it('should make a direct call to bop api for yankees data', () => {
        cy.request('GET','http://localhost:8080/api/search/events?keyword=new+york+yankees').then(response => {
            cy.writeFile('cypress/fixtures/good/new-york-yankees.json', response)
        });
    });

    it('should make a direct call to bop api for a$ap rocky data', () => {
        cy.request('GET','http://localhost:8080/api/search/events?keyword=a$ap+rocky').then(response => {
            cy.writeFile('cypress/fixtures/good/a$ap-rocky.json', response)
        });
    });

    it('should make a direct call to bop api for bad bunny data', () => {
        cy.request('GET','http://localhost:8080/api/search/events?keyword=bad+bunny').then(response => {
            cy.writeFile('cypress/fixtures/good/bad-bunny.json', response)
        });
    });
});