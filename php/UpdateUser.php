<?php

//.. مکان بعد فرم پویا - جایگاه : فرم اصلاح 

//// بررسی شرط برای انتخاب نوع کاربر و آپدیت کاربر جدید


if (@@rad_check == 1) {
    $var = PMFUpdateUser(@@act_txt_National_Code, @@act_txt_Mobile_number, @@act_txt_name, @@act_txt_famaly, 'PROCESSMAKER_OPERATOR', '2030-12-31', 'ACTIVE');
    
    if ($var == 0) {
        @@result = 'کاربر حقیقی ایجاد نشد';
    } else {
        @@result = 'کاربر حقیقی با موفقیت ایجاد شد';
    }

} else if (@@rad_check == 2) {
    $var = PMFUpdateUser(@@leg_txt_Rep_national, @@leg_txt_rep_mobile, @@leg_txt_rep_name, @@leg_txt_rep_family, 'PROCESSMAKER_OPERATOR', '2030-12-31', 'ACTIVE');
    
    if ($var == 0) {
        @@result = 'کاربر حقوقی ایجاد نشد';
    } else {
        @@result = 'کاربر حقوقی ایجاد شد';
    }
}
