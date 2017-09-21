## gammel produkter.js
const mysql = require('mysql2');
const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'hifi'
});

console.log('produkter 2 fil');

module.exports = (server) => {


    //Et bestemt produkt
    server.get('/test', (req, res) => {
        console.log('test route');
        res.send("aaaaargh!");
    });

    //Alle produkter
    server.get('/hifi', (req, res) => {
        console.log("hifi route");

        const query = `SELECT produkter.*, producent.navn AS producentnavn
        from produkter 
        inner join producent 
        on producent = producent.id`;

        db.query(query, (err, rows) => {
            if (err) {
                console.log("Fejl i db.query: " + err);
                res.status(500);
                res.end();
            } else {
                res.send(rows);
            }
        });
    });



    //Et bestemt produkt
    server.get('/produkter/:varenr', (req, res) => {
        console.log('hej');
        const query = `SELECT produkter.*, kategori.navn AS kategorinavn
        from produkter 
        inner join kategori 
        on kategori = kategori.id
        where produkter.varenr = ?`;

        db.execute(query, [req.params.varenr], (err, row) => {
            if (err) {
                res.status(500);
                res.end();
            } else {
                res.send(row[0]);
            }
        });
    });
};
## gammel index.js
module.exports = (server) => {
    require('./produkter')(server);
    //require('./login')(server);
    //require('./hemmelig')(server);
    //require('./customers')(server);
}

## Gammel index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
        crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
                <a class="navbar-brand" href="index.html">ZYBERDATA's HiFi Shop</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="index.html">Home <span class="sr-only">(current)</span></a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Produkter <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">cd-afspillere</a></li>
                            <li><a href="#">dvd-afspillere</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Pladespillere</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Højtalere</a></li>
                        </ul>
                        <li><a href="#">contact</a></li>
                    </li>
                </ul>
                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
                <!-- <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul> -->
                </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
    <div class="container">
        <div class="row">
            <!-- /.col-md-12 -->
            <div class="col-md-12-1">
                <img src="dist/media/life.png" alt="Front End Develoment">
            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6"><br/>
                <h3>CD-Afspiller</h3>
                <img src="assets/media/creek_classic_cd.jpg" alt="CD-Afspiller"><br/><br/>

                <p><b>Pris:</b></p>

            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6"><br/>
                <h3>DVD-Afspiller</h3>
                <img src="assets/media/parasound_halod3.jpg" alt="DVD-Afspiller"><br/><br/>

                <p><b>Pris:</b></p>

            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6"><br/>
                <h3>Pladespillere</h3>
                <img src="assets/media/pro_ject_rpm10.jpg" alt="pladespiller"><br/><br/>

                <p><b>Pris:</b></p>


            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6"><br/>
                <h3>Højtalere</h3>
                <img src="assets/media/epos_m5.gif" alt="Højtalere"><br/><br/>

                <p><b>Pris:</b></p>

            </div>



            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <!-- Latest compiled and minified JavaScript -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
                crossorigin="anonymous"></script>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
                crossorigin="anonymous"></script>
            <!-- Latest compiled and minified JavaScript -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
                crossorigin="anonymous"></script>

            <footer>
                <!-- /.col-md-12 -->
                <div class="col-md-12">
                    <p>
                        <B>&copy; Copyright  2017  ZYBERDATA's HiFi Shop v. Randi Mortensen</B>
                    </p>
                </div>

            </footer>
</body>

</html>
