from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('MainPage.html')

@app.route("/meeting")
def meetingPage():
    return render_template('MeetingPage.html')

@app.route("/join")
def joinPage():
    return render_template('JoinPage.html')

@app.route("/login")
def loginPage():
    return render_template('LoginPage.html')

@app.route("/wait")
def waitPage():
    return render_template('WaitPage.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='80', debug=True)