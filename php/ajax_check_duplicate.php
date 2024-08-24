<?php


//.. مکان قبل فرم پویا - جایگاه : فرم اصلی 
try {
    // بررسی وجود داده‌های ارسال شده از فرم
    if (isset($_POST["act"]))
        $act = $_POST["act"];
    if (isset($_POST["actual_array"]))
        $actual_array = $_POST["actual_array"];
    if (isset($_POST["legal_array"]))
        $legal_array = $_POST["legal_array"];

    // عملیات افزودن داده‌های حقیقی
    if ($act == "add_actual") {
        // بررسی وجود رکورد تکراری بر اساس کد ملی
        $result = executeQuery("SELECT act_txt_National_Code FROM pmt_applicant_registration WHERE act_txt_National_Code = '{$actual_array[0]}'");

        // اگر رکوردی با کد ملی مشابه وجود دارد، پیام "تکراری" ارسال می‌شود
        if (is_array($result) && count($result) > 0) {
            die("Duplicate");
        }

        // درج رکورد جدید در جدول
        $var = executeQuery("INSERT INTO `pmt_applicant_registration`(`act_txt_National_Code`, `act_txt_name`, `act_txt_famaly`, `act_txt_father_name`, `act_dat_Date_of_birth`, `act_txt_Id`, `act_txt_place_of_birth`, `act_txt_fixed_number`, `act_rad_gender`, `act_rad_gender_label`, `act_txt_Mobile_number`) VALUES ('{$actual_array[0]}', '{$actual_array[1]}', '{$actual_array[2]}', '{$actual_array[3]}', '{$actual_array[4]}', '{$actual_array[5]}', '{$actual_array[6]}', '{$actual_array[7]}', '{$actual_array[8]}', '{$actual_array[9]}', '{$actual_array[10]}')");

        // ارسال پاسخ موفقیت‌آمیز
        die("1");
    }
    
    // عملیات افزودن داده‌های حقوقی
    else if ($act == "add_legal") {
        // بررسی وجود رکورد تکراری بر اساس کد ملی نماینده و کد پستی
        $result = executeQuery("SELECT leg_txt_Rep_national AND leg_txt_Postal_code FROM pmt_applicant_registration WHERE leg_txt_Rep_national = '{$legal_array[11]}' AND leg_txt_Postal_code = '{$legal_array[18]}'");

        // اگر رکوردی با مشخصات مشابه وجود دارد، پیام "تکراری" ارسال می‌شود
        if (is_array($result) && count($result) > 0) {
            die("Duplicate");
        }

        // درج رکورد جدید در جدول
        $var = executeQuery("INSERT INTO `pmt_applicant_registration`(`leg_txt_company_name`, `leg_drp_company_type`, `leg_drp_company_type_label`, `leg_txt_national_id`, `leg_txt_economic_code`, `leg_txt_reg_number`, `leg_txt_regplace`, `leg_dat_reg_date`, `leg_txt_statute_no`, `leg_dat_ad_date`, `leg_txt_ad_number`, `leg_txt_Rep_national`, `leg_txt_rep_name`, `leg_txt_rep_family`, `leg_txt_rep_fix_phone`, `leg_txt_rep_mobile`, `leg_txt_fix_owner_number`, `leg_txt_owner_mobile`, `leg_txt_Postal_code`, `leg_txr_address`, `leg_drp_city`, `leg_drp_city_label`) VALUES ('{$legal_array[0]}', '{$legal_array[1]}', '{$legal_array[2]}', '{$legal_array[3]}', '{$legal_array[4]}', '{$legal_array[5]}', '{$legal_array[6]}', '{$legal_array[7]}', '{$legal_array[8]}', '{$legal_array[9]}', '{$legal_array[10]}', '{$legal_array[11]}', '{$legal_array[12]}', '{$legal_array[13]}', '{$legal_array[14]}', '{$legal_array[15]}', '{$legal_array[16]}', '{$legal_array[17]}', '{$legal_array[18]}', '{$legal_array[19]}', '{$legal_array[20]}', '{$legal_array[21]}')");

        // ارسال پاسخ موفقیت‌آمیز
        die("1");
    }

} catch (Exception $e) {
    // مدیریت استثناها و نمایش پیغام خطا در صورت بروز استثنا
    die("خطا: " . $e->getMessage());
}
