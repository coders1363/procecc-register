// مخفی کردن سابفرم تنظیمات:
let settingSubForm='14046728066bdbf854b2d55060897824';
$('#'+settingSubForm).hide();

//.................................

//تابع نمایش پیغام
function showAlert(type, message) {

  //استفاده از کتابخانه نوتیفیلیکس
  Notiflix.Notify.init({
    rtl: true,
    fontFamily: "Quicksand",
    useGoogleFont: true,
    position: "right-top",
    success: { notiflixIconColor: "#ffffff" },
    failure: { notiflixIconColor: "#ffffff" },
    warning: { notiflixIconColor: "#ffffff" }
  });

  switch (type) {
    case "error":
      Notiflix.Notify.failure(message);
      break;
    case "warning":
      Notiflix.Notify.warning(message);
      break;
    case "success":
      Notiflix.Notify.success(message);
      break;
    case "info":
      Notiflix.Notify.info(message);
      break;
              }

}



//توابع ماسک
var inputMaskTypes = {
  postalCode: ['leg_txt_Postal_code'],
  phone: ['act_txt_fixed_number','leg_txt_rep_fix_phone','leg_txt_fix_owner_number'],
  melliCode: ['act_txt_National_Code','leg_txt_Rep_national'],
  mobile: ['act_txt_Mobile_number','leg_txt_rep_mobile','leg_txt_owner_mobile'],
  integer: ['act_txt_Id','leg_txt_economic_code','leg_txt_reg_number','leg_txt_statute_no','leg_txt_ad_number','leg_txt_national_id'],
  pars: ['act_txt_name','act_txt_famaly','act_txt_father_name','act_txt_place_of_birth','leg_txt_company_name','leg_txt_regplace','leg_txt_rep_name','leg_txt_rep_family'],
  email: [ "txt_email"],

};
createInputmask(inputMaskTypes);


//...........................
// اضافه کردن رویداد کلیک به دکمه ثبت
$("#btn_record").click(function(){
  Register();
}).addClass('btn-success'); // افزودن کلاس btn-success به دکمه

// تابع ثبت اطلاعات
function Register(){  

  // دریافت وضعیت متقاضی
  var rad_Applicant = $("#rad_Applicant").getValue('');
  if (rad_Applicant == '') {
    dispAlert('لطفاً وضعیت متقاضی را انتخاب کنید.'); // نمایش پیام خطا
    return;
  }

  // اگر وضعیت متقاضی '1' باشد (حقیقی)
  if (rad_Applicant === '1') {

    // بررسی فیلدهای ضروری
    for(let i=0; i<required_filed_id_array_actual.length; i++){
      if ($("#"+required_filed_id_array_actual[i]).getValue() == '') {
        dispAlert('لطفاً '+required_filed_id_array_actual_txt[i]+' را وارد نمایید.'); // نمایش پیام خطا
        return;
      }
    }

    // دریافت مقادیر ورودی
    var nationalCode = $("#act_txt_National_Code").getValue();
    var postalCode = $("#leg_txt_Postal_code").getValue();

    // بررسی همسان بودن کد ملی و کد پستی
    if (nationalCode == postalCode) {
      dispAlert('کد ملی حقیقی و کد پستی حقوقی نمی توانند یکسان باشند.'); // نمایش پیام خطا
      $("#act_txt_National_Code, #leg_txt_Postal_code").css("border", "1px solid red");
      return;
    }

    // جمع‌آوری داده‌ها
    var actual_array = [];
    actual_array.push($("#act_txt_National_Code").getValue());
    actual_array.push($("#act_txt_name").getValue());
    actual_array.push($("#act_txt_famaly").getValue());
    actual_array.push($("#act_txt_father_name").getValue());
    actual_array.push($("#act_dat_Date_of_birth").getValue());
    actual_array.push($("#act_txt_Id").getValue());
    actual_array.push($("#act_txt_place_of_birth").getValue());
    actual_array.push($("#act_txt_fixed_number").getValue());
    actual_array.push($("#act_rad_gender").getValue());
    actual_array.push($("#act_rad_gender").getText() || ''); // متن جنسیت
    actual_array.push($("#act_txt_Mobile_number").getValue());

    // ارسال داده‌ها به سرور
    $.ajax({ 
      type: "POST",
      url: window.location,
      data: {
        actual_array: actual_array,
        act: "add_actual"
      },
      async: false,
      success: function (reg) {
        console.log(reg);
        if (reg == '1') {
          dispAlert('داده های فرم حقیقی با موفقیت ثبت شد','yellow'); // نمایش پیام موفقیت
        }
        else if (reg == 'Duplicate') {
          dispAlert('کد ملی حقیقی تکراری است'); // نمایش پیام خطا
          $("#act_txt_National_Code").css("border", "1px solid red");
          return;
        }
        else {
          dispAlert('وقوع خطا در ثبت!'); // نمایش پیام خطا
        }
      },
      error: function(a, b, c) {
        alert(c); // نمایش خطای سرور
      }
    });
  }

  // اگر وضعیت متقاضی '2' باشد (حقوقی)
  if (rad_Applicant === '2') {

    // بررسی فیلدهای ضروری
    for(let i=0; i<required_filed_id_array_legal.length; i++){
      if ($("#"+required_filed_id_array_legal[i]).getValue() == '') {
        dispAlert('لطفاً '+required_filed_id_array_legal_txt[i]+' را وارد نمایید.'); // نمایش پیام خطا
        return;
      }
    }

    // جمع‌آوری داده‌ها
    var legal_array = [];
    legal_array.push($("#leg_txt_company_name").getValue());
    legal_array.push($("#leg_drp_company_type").getValue());
    legal_array.push($("#leg_drp_company_type").getText() || ''); // متن نوع شرکت
    legal_array.push($("#leg_txt_national_id").getValue());
    legal_array.push($("#leg_txt_economic_code").getValue());
    legal_array.push($("#leg_txt_reg_number").getValue());
    legal_array.push($("#leg_txt_regplace").getValue());
    legal_array.push($("#leg_dat_reg_date").getValue());
    legal_array.push($("#leg_txt_statute_no").getValue());
    legal_array.push($("#leg_dat_ad_date").getValue());
    legal_array.push($("#leg_txt_ad_number").getValue());
    legal_array.push($("#leg_txt_Rep_national").getValue());
    legal_array.push($("#leg_txt_rep_name").getValue());
    legal_array.push($("#leg_txt_rep_family").getValue());
    legal_array.push($("#leg_txt_rep_fix_phone").getValue());
    legal_array.push($("#leg_txt_rep_mobile").getValue());
    legal_array.push($("#leg_txt_fix_owner_number").getValue());
    legal_array.push($("#leg_txt_owner_mobile").getValue());
    legal_array.push($("#leg_txt_Postal_code").getValue());
    legal_array.push($("#leg_txr_address").getValue());
    legal_array.push($("#leg_drp_city").getValue());
    legal_array.push($("#leg_drp_city").getText() || ''); // متن شهر

    // ارسال داده‌ها به سرور
    $.ajax({ 
      type: "POST",
      url: window.location,
      data: {
        legal_array: legal_array,
        act: "add_legal"
      },
      async: false,
      success: function (reg) {
        console.log(reg);
        if (reg == '1') {
          var form_id = $("form").prop('id');
          $("#"+form_id).submit(); // ارسال فرم
          dispAlert('داده های فرم حقوقی با موفقیت ثبت شد','yellow'); // نمایش پیام موفقیت
        }
        else if (reg == 'Duplicate') {
          dispAlert('کد ملی نماینده با وکیل حقوقی تکراری است');
          dispAlert('کد پستی مالک حقوقی تکراری است');
          $("#leg_txt_Rep_national, #leg_txt_Postal_code").css("border", "1px solid red");
          return;   
        }
        else {
          dispAlert('وقوع خطا در ثبت!'); // نمایش پیام خطا
        }
      },
      error: function(a, b, c) {
        alert(c); // نمایش خطای سرور
      }
    });
  }
}


//.............................
// تابع برای تنظیم فیلدهای حقوقی بر اساس وضعیت متقاضی
function legal_info(newVal) {
  const legal = (newVal == '2'); // بررسی وضعیت متقاضی برای حقوقی
  legalFields = $("[id^='leg_']"); // انتخاب تمام فیلدهای حقوقی
  for(field in legalFields) {
    if(legalFields[field].getAttribute) {
      const id = legalFields[field].getAttribute('id');
      legal ? $('#'+id).enableValidation() : $('#'+id).disableValidation(); // فعال/غیرفعال کردن اعتبارسنجی
      legal ? $('#'+id).show() : $('#'+id).hide(); // نمایش/پنهان کردن فیلدها
    }
  }
}

// تابع برای تنظیم فیلدهای حقیقی بر اساس وضعیت متقاضی
function actual_info(newVal) {
  const actual = (newVal == '1'); // بررسی وضعیت متقاضی برای حقیقی
  actualFields = $("[id^='act_']"); // انتخاب تمام فیلدهای حقیقی
  for(field in actualFields) {
    if(actualFields[field].getAttribute) {
      const id = actualFields[field].getAttribute('id');
      actual ? $('#'+id).enableValidation() : $('#'+id).disableValidation(); // فعال/غیرفعال کردن اعتبارسنجی
      actual ? $('#'+id).show() : $('#'+id).hide(); // نمایش/پنهان کردن فیلدها
    }
  }
}

// تابع برای بررسی وضعیت متقاضی و به روزرسانی نمایش فرم
function check_rad_Applicant() {
  var rad_Applicant = $("#rad_Applicant").getValue() != "" ? $("#rad_Applicant").getValue() : 0;
  if(rad_Applicant == 0)
    $('#grd_document').hide(); // پنهان کردن جدول مستندات اگر وضعیت متقاضی 0 است
  else
    $('#grd_document').show(); // نمایش جدول مستندات
  actual_info(rad_Applicant); // به روزرسانی فیلدهای حقیقی
  legal_info(rad_Applicant); // به روزرسانی فیلدهای حقوقی
}

// اضافه کردن رویداد تغییر به عنصر وضعیت متقاضی
$("#rad_Applicant").setOnchange(function (){
  check_rad_Applicant(); // بررسی وضعیت و به روزرسانی فرم
  load_grd_document(); // بارگذاری مستندات
});

// تابع برای بارگذاری مستندات به جدول
function load_grd_document() {
  var rad_Applicant = $("#rad_Applicant").getValue();
  $.ajax({
    url: window.location,
    data: {
      act: 'load_grd_document',
      user_type: rad_Applicant
    },
    dataType: 'json',
    type: 'post',
    success: function(data) {
      clear_grid('grd_document'); // پاک کردن جدول مستندات
      for(var i = 0; i < data.length; i++) {
        $("#grd_document").addRow([{value: data[i]['doc_name']}]); // اضافه کردن هر مستند به جدول
      }
    }
  });
}

// تابع برای پاک کردن تمام ردیف‌های جدول
function clear_grid(grd_name) {
  var row = $('#'+grd_name).getNumberRows();
  while(row > 0) {
    $('#'+grd_name).deleteRow(1); // حذف ردیف‌ها
    row = $('#'+grd_name).getNumberRows();
  }
}

// تابع برای اضافه کردن CSS به جدول‌ها
function addCssToGrids() {
  var arr_elems = $('div[id] .pmdynaform-grid-thead');
  for (let i = 0, p; i < arr_elems.length; i++) {
    p = $(arr_elems[i]);
    p.css('font-weight', 'bold'); // تنظیم وزن فونت
    p.find('.title-column').css('white-space', 'normal').css('width', '95%').css('margin-bottom', '-10px'); // تنظیم CSS ستون عنوان
    $(p.find('div.wildcard').first())
      .css({'transform' : 'rotate(-90deg)'}) // چرخش عنوان ستون
      .css('margin-bottom', '20px').text('ردیف'); // تنظیم متن و حاشیه
  }
}

// افزودن CSS به جدول‌ها پس از بارگذاری صفحه
$(function(){
  addCssToGrids();
});

// آرایه‌های فیلدهای ضروری برای فرم‌های حقیقی و حقوقی
var required_filed_id_array_actual = [
  'act_txt_National_Code',
  'act_txt_name',
  'act_txt_famaly',
  'act_txt_Mobile_number'
],
    required_filed_id_array_actual_txt = [
      'کد ملی',
      'نام',
      'نام خانوادگی',
      'شماره همراه'
    ];

var required_filed_id_array_legal = [
  'leg_txt_company_name',
  'leg_drp_company_type',
  'leg_txt_national_id',
  'leg_txt_economic_code',
  'leg_txt_reg_number',
  'leg_txt_regplace',
  'leg_dat_reg_date',
  'leg_txt_statute_no',
  'leg_dat_ad_date',
  'leg_txt_ad_number',
  'leg_txt_Rep_national',
  'leg_txt_rep_name',
  'leg_txt_rep_family',
  'leg_txt_Postal_code',
  'leg_txr_address'
],
    required_filed_id_array_legal_txt = [
      'نام شرکت',
      'نوع شرکت',
      'شناسه ملی شرکت',
      'کد اقتصادی',
      'شماره ثبت',
      'محل ثبت',
      'تاریخ ثبت',
      'شماره اساسنامه',
      'تاریخ آگهی',
      'شماره آگهی',
      'کد ملی ',
      'نام',
      'نام خانوادگی ',
      'کد پستی مالک',
      'آدرس مالک'
    ];

// افزودن رویداد کلیک به دکمه ارسال فرم
$("#btn_review button").click(function(){
  var form_id = $("form").prop('id');
  $("#" + form_id).submitForm(); // ارسال فرم
}).addClass('btn-success'); // افزودن کلاس btn-success به دکمه
