#-*- encoding: iso-8859-15 -*-

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
from google.appengine.ext import db

#class Usuario(db.Model):
#	nome = db.StringProperty(required = True)
#	datacadastro = db.DateTimeProperty(auto_now_add = True)

class MainPage(webapp.RequestHandler):
	def get(self):
		self.response.out.write(template.render("SortingAlgorithms.html",None))
		
	def post(self):
		self.response.out.write("")

app = webapp.WSGIApplication([('/SortingAlgorithms.html', MainPage)])

def main():
	run_wsgi_app(app)

if(__name__=="__main__"):
	main()
