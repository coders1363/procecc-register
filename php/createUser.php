<?php

//.. مکان قبل فرم پویا - جایگاه : فرم اصلی 

//// بررسی شرط برای انتخاب نوع کاربر و ایجاد کاربر جدید

if (@@rad_check == 1) {
    $var = PMFCreateUser(@@act_txt_National_Code, @@act_txt_Mobile_number, @@act_txt_name, @@act_txt_famaly, 'PROCESSMAKER_OPERATOR', '2030-12-31', 'ACTIVE');
} else if (@@rad_check == 2) {
    $var = PMFCreateUser(@@leg_txt_Rep_national, @@leg_txt_rep_mobile, @@leg_txt_rep_name, @@leg_txt_rep_family, 'PROCESSMAKER_OPERATOR', '2030-12-31', 'ACTIVE');
}
