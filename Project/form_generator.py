from flask import Flask, redirect, url_for, request
import sqlite3
app = Flask(__name__)

@app.route('/success/<name>')
def success(name):
    return ' %s' % name

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']
        # call the method to store the data in database(sqlite)
        store_login(first_name, last_name, email,password)
        
        return redirect(url_for('success', name=first_name))
    else:
        user = request.args.get('first_name')
        return redirect(url_for('success', name=user))

###########


def store_login(first_name, last_name, email,password):
    print(first_name)
    connection = sqlite3.connect("C:/Users/vijay/Documents/Saradha_R/Project-2/Project/app.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute("""
    insert into login
    values (?,?,?,?)

    """, (first_name,last_name,email,password))
  

    connection.commit()
    return ""

    # return templates.TemplateResponse("index.html", {"request": request, "stocks": rows})

##########



if __name__ == '__main__':
    app.run(debug=True)
