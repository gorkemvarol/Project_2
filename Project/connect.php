<?php
$school = filter_input(INPUT_POST, 'school');
$subject = filter_input(INPUT_POST, 'subject');
$level = filter_input(INPUT_POST, 'level');
$when = filter_input(INPUT_POST, 'when');
$where = filter_input(INPUT_POST, 'where');
$groupType = filter_input(INPUT_POST, 'groupType');
if (!empty($school)){
if (!empty($subject)){
if (!empty($when)){
if (!empty($where)){
if (!empty($groupType)){

//enter db name etc here
$host = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "";
// Create connection
$conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);
if (mysqli_connect_error()){
die('Connect Error ('. mysqli_connect_errno() .') '
. mysqli_connect_error());
}
else{
$sql = "INSERT INTO account (school, subject, level,when,where, groupType)
values ('$school','$subject','$level','$when','$where'.'$groupType)";
if ($conn->query($sql)){
echo "New record is inserted sucessfully";
}
else{
echo "Error: ". $sql ."
". $conn->error;
}
$conn->close();
}
}
else{
echo "Password should not be empty";
die();
}
}
else{
echo "Username should not be empty";
die();
}
?>