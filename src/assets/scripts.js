// var a;
// var b;




$(document).ready(function() {
    $('.modal').modal();
});

$(document).ready(function() {
    $('.sidenav').sidenav();
});

$(document).ready(function() {
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
});

// function pull_data() {
//     var str_html = '';

//     $.getJSON("http://localhost/wecater/user/", function(data) {
//         console.log(data);
//         a = data.payload;
//         for (var i = 0; i < a.length; i++) {
//             console.log(a[i].user_id);

//             var id = a[i].user_id;
//             var fname = a[i].user_fname;
//             var lname = a[i].user_lname;
//             var email = a[i].user_emailadd;
//             var contact = a[i].user_contact;
//             var username = a[i].user_username;

//             str_html += '<tr>';
//             str_html += '<td>' + id + '</td>';
//             str_html += '<td>' + fname + '</td>';
//             str_html += '<td>' + lname + '</td>';
//             str_html += '<td>' + email + '</td>';
//             str_html += '<td>' + contact + '</td>';
//             str_html += '<td>' + username + '</td>';
//             str_html += '<td><button class="waves-effect waves-light btn-flat red white-text" onclick="delete_user(' + i + ')"><i class="material-icons">delete</i></button></td>';
//             str_html += '</tr>';
//         }
//         $('#users').html(str_html);
//     });
// }


// function delete_user(indx) {
//     var user_id = a[indx].user_id;
//     $.ajax({
//         url: 'http://localhost/wecater/deleteuser',
//         dataType: 'json',
//         type: 'POST',
//         data: JSON.stringify({ 'user_id': user_id }),
//         success: function(data) {
//             pull_data();
//         }
//     });

// }


// function pull_cateringcompany() {

//     var str_html = '';

//     $.getJSON("http://localhost/wecater/cateringcompanies/", function(data) {
//         console.log(data);
//         b = data.payload;
//         for (var i = 0; i < b.length; i++) {
//             console.log(b[i].company_id);

//             var companyID = b[i].company_id;
//             var company = b[i].company_name;
//             var street = b[i].company_streetadd;
//             var city = b[i].company_cityadd;
//             var companyContact = b[i].company_contact;
//             var companyEmail = b[i].company_emailadd;

//             str_html += '<tr>';
//             str_html += '<td>' + companyID + '</td>';
//             str_html += '<td>' + company + '</td>';
//             str_html += '<td>' + street + '</td>';
//             str_html += '<td>' + city + '</td>';
//             str_html += '<td>' + companyContact + '</td>';
//             str_html += '<td>' + companyEmail + '</td>';
//             str_html += '<td><button data-target="modal1" class="waves-effect waves-light btn-flat green darken-1 white-text btn modal-trigger" onclick="show_name(' + i + ')"><i class="material-icons">create</i></button><button style="margin-left: 10px" class="waves-effect waves-light btn-flat red white-text" onclick="deletecompany(' + i + ')"><i class="material-icons">delete</i></button></td>';
//             str_html += '</tr>';
//         }
//         $('#cateringservice').html(str_html);
//     });
// }

// function deletecompany(indx) {
//     var recno = b[indx].company_id;
//     $.ajax({
//         url: 'http://localhost/wecater/delcateringcompany',
//         dataType: 'json',
//         type: 'POST',
//         data: JSON.stringify({ 'recno': recno }),
//         success: function(data) {
//             pull_cateringcompany();
//         }
//     });

// }


// function add_company() {
//     var company_name = $("#company_name").val();
//     var company_streetadd = $("#company_streetadd").val();
//     var company_cityadd = $("#company_cityadd").val();
//     var company_contact = $("#company_contact").val();
//     var company_emailadd = $("#company_emailadd").val();



//     console.log(company_name, company_streetadd, company_cityadd, company_contact, company_emailadd);
//     $.ajax({
//         url: "http://localhost/wecater/addcateringcompany",
//         dataType: 'json',
//         type: 'POST',
//         data: JSON.stringify({ 'company_name': company_name, 'company_streetadd': company_streetadd, 'company_cityadd': company_cityadd, 'company_contact': company_contact, 'company_emailadd': company_emailadd }),
//         success: function(data) {
//             console.log(data);
//             pull_cateringcompany();
//         }
//     });

// }

// function show_name(indx) {
//     $('#company_id').val(b[indx].company_id);
//     $('#company_name').val(b[indx].company_name);
//     $('#company_streetadd').val(b[indx].company_streetadd);
//     $('#company_cityadd').val(b[indx].company_cityadd);
//     $('#company_contact').val(b[indx].company_contact);
//     $('#company_emailadd').val(b[indx].company_emailadd);
//     document.getElementById("modaltitle").innerHTML = "Edit Company Details";
// }


// function edit_company() {
//     var company_id = $("#company_id").val();
//     var company_name = $("#company_name").val();
//     var company_streetadd = $("#company_streetadd").val();
//     var company_cityadd = $("#company_cityadd").val();
//     var company_contact = $("#company_contact").val();
//     var company_emailadd = $("#company_emailadd").val();



//     console.log(company_id, company_name, company_streetadd, company_cityadd, company_contact, company_emailadd);
//     $.ajax({
//         url: "http://localhost/wecater/editcateringcompany",
//         dataType: 'json',
//         type: 'POST',
//         data: JSON.stringify({ 'company_id': company_id, 'company_name': company_name, 'company_streetadd': company_streetadd, 'company_cityadd': company_cityadd, 'company_contact': company_contact, 'company_emailadd': company_emailadd }),
//         success: function(data) {
//             console.log(data);
//             pull_cateringcompany();
//         }
//     });

// }



// function readFile() {
//     if (this.files && this.files[0]) {
//         var FR = new FileReader();

//         FR.addEventListener("load", function(e) {
//             document.getElementById("img").src = e.target.result;
//             document.getElementById("bs64").innerHTML = e.target.result;

//             var base64String = window.btoa(binaryDate);
//             document.getElementById('bs64').value = base64String;

//         });

//         FR.readAsDataURL(this.files[0]);



//     }
// }

// function clearAll() {
//     document.getElementById("modaltitle").innerHTML = "Add New Company";
//     $('#company_id').val('');
//     $('#company_name').val('');
//     $('#company_streetadd').val('');
//     $('#company_cityadd').val('');
//     $('#company_contact').val('');
//     $('#company_emailadd').val('');
// }

// function logout() {
//     location.replace("http://localhost:4200/login");
// }


// document.getElementById("inp2").addEventListener("change", readFile);

// function scroll2top() {
//     var btn = $('#scroll');

//     $(window).scroll(function() {
//         if ($(window).scrollTop() > 300) {
//             btn.addClass('show');
//         } else {
//             btn.removeClass('show');
//         }
//     });

//     btn.on('click', function(e) {
//         e.preventDefault();
//         $('html, body').animate({ scrollTop: 0 }, '300');
//     });
// }