<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Cricket</title>
    <link rel="stylesheet" href="/css/app.css" type="text/css">    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <style>
        .container{
            max-width: 100%;
        }
        .card{
            margin: 50px;
            padding: 9px;
        }
        .card-img-top img{
            border-radius: 60%;
        }
        .images{
            border-radius: 60%;
        }
        .name-cricket{
            font-size: 20px;
        }
        .nav-link{
            font-size: 16px;
        }
        .vs-group{
            font-size: 16px;
        }
        .randomclass{
            margin-top:100px;
        }
        .cardmade{
            padding: 25px;
            border: 1px solid #eee;
            margin-bottom: 20px;
        }
        .table{
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="app"></div>
</body>
<script src="js/app.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</html>