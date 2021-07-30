
from flask import Flask, redirect, render_template,url_for, request
import sqlite3

# Create an instance of Flask
app = Flask(__name__)

# Route to render name
@app.route('/success/<name>')
def success(name):
    # return 'Hello'
    return render_template("landing.html", name=name)

# route to store login information
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']
        # call the method to store the data in database(sqlite)
        store_login(first_name, last_name, email, password) 
        
        return redirect(url_for('success', name=first_name))
    else:
        user = request.args.get('first_name')
        return redirect(url_for('success', name=user))


# Route for study_group
@app.route('/study_group', methods=['POST', 'GET'])
def study_group():
    print("hi")
    if request.method == 'POST':
        school = request.form['school']
        state = request.form['state']
        subject = request.form['subject']
        course_level = request.form['level']
        time = request.form['when']
        location = request.form['where']
        group_type = request.form['groupType']


        # call the method to store the data in database(sqlite)
        store_study_group(school, state, subject, course_level,time,location,group_type)
        
        return redirect(url_for('success', name=subject))
    else:
        user = request.args.get('school')
        return redirect(url_for('success', name=user))

#####################################################################

# function for database connection 
def store_login(first_name, last_name, email,password):
    print(last_name)
    connection = sqlite3.connect("C:/Users/vijay/Documents/Saradha_R/Project-2/Project/app.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute("""
    insert into login
    values (?,?,?,?)
    """, (first_name,last_name,email,password))
  

    connection.commit()
    connection.close()
    return ""

    # return templates.TemplateResponse("index.html", {"request": request, "stocks": rows})

def store_study_group(school, state, subject, course_level,time,location,group_type):
    print("hello")
    connection = sqlite3.connect("C:/Users/vijay/Documents/Saradha_R/Project-2/Project/app.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute("""
    insert into study_group
    values (?,?,?,?,?,?,?)
    """, (school, state, subject, course_level,time,location,group_type))
  

    connection.commit()
    connection.close()
    return ""


##########



if __name__ == '__main__':
    app.run(debug=True)