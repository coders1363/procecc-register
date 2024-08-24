<?php


if (isset($_POST["act"]))
	$act = $_POST["act"];
if (isset($_POST["variablesactual"]))
	$variablesactual = $_POST["variablesactual"];

if (isset($_POST["variableslegal"]))
	$variableslegal = $_POST["variableslegal"];


if ($act == "add_actual") {
	$result = executeQuery("SELECT act_txt_National_Code FROM pmt_applicant_registrtion WHERE act_txt_National_Code = '{$variablesactual[0]}'");

	if (is_array($result) && count($result) > 0) {
		die("Duplicate");
	}

	
	
	die("1");
	
	
}



else if ($act == "add_legal") {
	$result = executeQuery("SELECT leg_txt_Rep_national AND leg_txt_Postal_code FROM pmt_applicant_registrtion WHERE leg_txt_Rep_national = '{$variableslegal[11]}' AND leg_txt_Postal_code = '{$variableslegal[17]}'");

	if (is_array($result) && count($result) > 0) {
		die("Duplicate");
	}

	
	die("1");
	
}