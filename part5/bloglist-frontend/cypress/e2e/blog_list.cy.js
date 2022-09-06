describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        username: 'michael',
        name: 'michael ohayon',
        password: 'sisma'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeds with correct credentials', function () {
      cy.get('#username').type('michael')
      cy.get('#password').type('sisma')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('michael ohayon logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('michael')
      cy.get('#password').type('WRONGPASSWORD')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'michael ohayon logged in')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'michael', password: 'sisma' })
      })


      it("A blog can be created", function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('test adding new blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('www')
        cy.contains('submit').click()

        cy.contains('test adding new blog cypress')
      })

      it('A blog can be liked', function () {
        cy.createBlog({ title: 'another testing blog', author: 'cypress', url: 'asdfafsaf' })

        cy.contains('another testing blog')
          .contains('view').click()

        cy.contains('likes 0')

        cy.contains('likes')
          .contains('like').click()

        cy.contains('likes 1')

      })

      it('A blog can be deleted by the user who created it', function () {
        cy.createBlog({ title: 'another testing blog', author: 'cypress', url: 'asdfafsaf' })

        cy.contains('another testing blog')
          .contains('view').click()

        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'another testing blog')

      })
      it('Blogs are ordered according to likes with the blog with the most likes being first.', function () {
        cy.createBlog({ title: 'first Blog', author: 'cypress1', url: 'wwww1' })
        cy.createBlog({ title: 'second Blog', author: 'cypress2', url: 'wwww22' })
        cy.createBlog({ title: 'third Blog', author: 'cypress3', url: 'wwww333' })

        cy.get('.blog').eq(0).should('contain', 'first Blog')
        cy.get('.blog').eq(1).should('contain', 'second Blog')
        cy.get('.blog').eq(2).should('contain', 'third Blog')

        cy.contains('third Blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('second Blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.wait(500)
        cy.contains('like').click()
        cy.wait(500)
        cy.contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'second Blog')
        cy.get('.blog').eq(1).should('contain', 'third Blog')
        cy.get('.blog').eq(2).should('contain', 'first Blog')

      })
      it('A blog cant be deleted by users who did not create it', function () {
        cy.createBlog({ title: 'another testing blog', author: 'cypress', url: 'asdfafsaf' })

        cy.contains('logout').click()
        const otherUser = {
          username: 'notMichael',
          name: 'not michael ohayon',
          password: 'sisma'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
        cy.login({ username: 'notMichael', password: 'sisma' })

        cy.contains('another testing blog')
          .contains('view').click()

        cy.contains('remove').click()

        cy.contains('another testing blog')
      })

    })

  })

})