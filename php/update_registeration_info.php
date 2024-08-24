<?php


if (isset($_POST["act"]))
	$act = $_POST["act"];
if (isset($_POST["actual_array"]))
	$actual_array = $_POST["actual_array"];
if (isset($_POST["grid_array_actual"]))
	$grid_array_actual = $_POST["grid_array_actual"];
if (isset($_POST["legal_array"]))
	$legal_array = $_POST["legal_array"];
if (isset($_POST["grid_array_legal"]))
	$grid_array_legal = $_POST["grid_array_legal"];


if ($act == "update_actual") {
	
	$var = executeQuery("UPDATE `pmt_applicant_registration_taran` SET `act_txt_National_Code`='{$actual_array[0]}', `act_txt_name_and_surname`='{$actual_array[1]}', `act_txt_father_name`='{$actual_array[2]}',`act_dat_Date_of_birth`='{$actual_array[3]}', `act_txt_Id`='{$actual_array[4]}', `act_txt_place_of_birth`='{$actual_array[5]}',`act_txt_fixed_number`='{$actual_array[6]}', `act_txt_Mobile_number`='{$actual_array[7]}',`act_rad_gender`='{$actual_array[8]}', `act_rad_gender_label`='{$actual_array[9]}' WHERE `ID`='$id'");
	die(json_encode($var));
	
	
for ($i = 0; $i < count($grid_array_actual); $i++) {
		$row = $grid_array_actual[$i];
		$var1 = executeQuery("INSERT INTO `pmt_grid_documents_actual` (`act_mfi`, `act_mfi_label`,`act_drp_send_doc`, `act_drp_send_doc_label`) VALUES ('{$row[0]}', '{$row[1]}','{$row[2]}', '{$row[3]}')");
	}
	
}
else if ($act == "update_legal") {
	
	$var = executeQuery("UPDATE `pmt_applicant_registration_taran` SET `leg_txt_company_name`='{$legal_array[0]}', `leg_drp_company_type`='{$legal_array[1]}', `leg_drp_company_type_label`='{$legal_array[2]}',`leg_txt_national_id`='{$legal_array[3]}', `leg_txt_economic_code`='{$legal_array[4]}', `leg_txt_reg_number`='{$legal_array[5]}',`leg_txt_regplace`='{$legal_array[6]}', `leg_dat_reg_date`='{$legal_array[7]}',`leg_txt_statute_no`='{$legal_array[8]}', `leg_dat_ad_date`='{$legal_array[9]}'
	
	, `leg_txt_ad_number`='{$legal_array[10]}', `leg_txt_Rep_national`='{$legal_array[11]}', `leg_txt_rep_name_and_surname`='{$legal_array[12]}', `leg_txt_rep_fix_phone`='{$legal_array[13]}', `leg_txt_rep_mobile`='{$legal_array[14]}', `leg_txt_fix_owner_number`='{$legal_array[15]}', `leg_txt_owner_mobile`='{$legal_array[16]}', `leg_txt_Postal_code`='{$legal_array[17]}', `leg_txr_address`='{$legal_array[18]}', `leg_drp_city`='{$legal_array[19]}', `leg_drp_city_label`='{$legal_array[20]}'
	WHERE `ID`='$id'");
	die(json_encode($var));
	
	
for ($i = 0; $i < count($grid_array_legal); $i++) {
		$row = $grid_array_legal[$i];
		$var1 = executeQuery("INSERT INTO `pmt_grid_documents_legal` (`leg_mfi`, `leg_mfi_label`,`leg_drp_send_doc`, `leg_drp_send_doc_label`) VALUES ('{$row[0]}', '{$row[1]}','{$row[2]}', '{$row[3]}')");
	}
		
	
	
}