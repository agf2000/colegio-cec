$(function () {

    kendo.culture().calendar.firstDay = 1;
    kendo.culture("pt-BR");

    $('#kdpStudentBDate').kendoDatePicker();
    $('#kdpStudentRegister').kendoDatePicker();
    $('#kdpFatherBDate').kendoDatePicker();
    $('#kdpMotherBDate').kendoDatePicker();

    // let states = [];

    // $.getJSON("data/states.json", function (data) {
    //     states = data;
    // });

    $('#sel2StudentStates').select2({
        placeholder: 'Selecione o estado',
        language: "pt-BR",
        ajax: {
            url: '/states',
            dataType: 'json',
            cache: true
        },
        minimumResultsForSearch: Infinity,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function format(repo) {
            if (repo.loading) return repo.text;
            let markup = '<option value="' + repo.id + '">' + repo.text + '</option>'
            return markup;
        },
        templateSelection: function (roles) {
            return roles.name || roles.text;
        }
    });

    $('#sel2StudentStates').on("select2:select", function (e) {
        if ($('#sel2StudentStates').val() !== null) {
            $("#sel2StudentCities").prop("disabled", false);
            $('#sel2StudentCities').select2('open');
        }
    });

    $('#sel2StudentCities').select2({
        placeholder: 'Selecione a cidade',
        language: "pt-BR",
        ajax: {
            url: '/cities',
            dataType: 'json',
            delay: 250,
            data: function (term, page) {
                return {
                    q: term, // search term
                    state: $('#sel2StudentStates').select2('data')[0].id,
                    page: page,
                };
            },
            processResults: function (data, page) {
                var more = (page * 10) < data.length;
                return {
                    results: data,
                    pagination: more
                };
            }
        },
        minimumInputLength: 3,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function format(repo) {
            if (repo.loading) return repo.text;
            let markup = '<option value="' + repo.id + '">' + repo.text + '</option>'
            return markup;
        },
        templateSelection: function (roles) {
            return roles.name || roles.text;
        }
    });

    $('#sel2FatherStates').select2({
        placeholder: 'Selecione o estado',
        language: "pt-BR",
        ajax: {
            url: '/states',
            dataType: 'json',
            cache: true
        },
        minimumResultsForSearch: Infinity,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function format(repo) {
            if (repo.loading) return repo.text;
            let markup = '<option value="' + repo.id + '">' + repo.text + '</option>'
            return markup;
        },
        templateSelection: function (roles) {
            return roles.name || roles.text;
        }
    });

    $('#sel2FatherStates').on("select2:select", function (e) {
        if ($('#sel2FatherStates').val() !== null) {
            $("#sel2FatherCities").prop("disabled", false);
            $('#sel2FatherCities').select2('open');
        }
    });

    $('#sel2FatherCities').select2({
        placeholder: 'Selecione a cidade',
        language: "pt-BR",
        ajax: {
            url: '/cities',
            dataType: 'json',
            delay: 250,
            data: function (term, page) {
                return {
                    q: term, // search term
                    state: $('#sel2FatherStates').select2('data')[0].id,
                    page: page,
                };
            },
            processResults: function (data, page) {
                var more = (page * 10) < data.length;
                return {
                    results: data,
                    pagination: more
                };
            }
        },
        minimumInputLength: 3,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function format(repo) {
            if (repo.loading) return repo.text;
            let markup = '<option value="' + repo.id + '">' + repo.text + '</option>'
            return markup;
        },
        templateSelection: function (roles) {
            return roles.name || roles.text;
        }
    });

    $('#sel2MotherStates').select2({
        placeholder: 'Selecione o estado',
        language: "pt-BR",
        ajax: {
            url: '/states',
            dataType: 'json',
            cache: true
        },
        minimumResultsForSearch: Infinity,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function format(repo) {
            if (repo.loading) return repo.text;
            let markup = '<option value="' + repo.id + '">' + repo.text + '</option>'
            return markup;
        },
        templateSelection: function (roles) {
            return roles.name || roles.text;
        }
    });

    $('#sel2MotherStates').on("select2:select", function (e) {
        if ($('#sel2MotherStates').val() !== null) {
            $("#sel2MotherCities").prop("disabled", false);
            $('#sel2MotherCities').select2('open');
        }
    });

    $('#sel2MotherCities').select2({
        placeholder: 'Selecione a cidade',
        language: "pt-BR",
        ajax: {
            url: '/cities',
            dataType: 'json',
            delay: 250,
            data: function (term, page) {
                return {
                    q: term, // search term
                    state: $('#sel2MotherStates').select2('data')[0].id,
                    page: page,
                };
            },
            processResults: function (data, page) {
                var more = (page * 10) < data.length;
                return {
                    results: data,
                    pagination: more
                };
            }
        },
        minimumInputLength: 3,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function format(repo) {
            if (repo.loading) return repo.text;
            let markup = '<option value="' + repo.id + '">' + repo.text + '</option>'
            return markup;
        },
        templateSelection: function (roles) {
            return roles.name || roles.text;
        }
    });

    $('#chkBoxSameAddress1').click(function (e) {
        if (this.checked) {
            $('#inputFatherZipCode').val($('#inputStudentZipCode').val());
            $('#sel2FatherStates').append(`<option value="${$('#sel2StudentStates').select2('data')[0].id}" selected>${$('#sel2StudentStates').select2('data')[0].text}</option>`);
            $('#sel2FatherCities').append(`<option value="${$('#sel2StudentCities').select2('data')[0].id}" selected>${$('#sel2StudentCities').select2('data')[0].text}</option>`);
            $('#inputFatherAddress').val($('#inputStudentAddress').val());
            $('#inputFatherDistrict').val($('#inputStudentDistrict').val());
        } else {
            $('#inputFatherZipCode').val(null);
            $('#sel2FatherStates').append(`<option value="${$('#sel2StudentStates').select2('data')[0].id}" selected>${$('#sel2StudentStates').select2('data')[0].text}</option>`);
            $('#sel2FatherCities').append(`<option value="${$('#sel2StudentCities').select2('data')[0].id}" selected>${$('#sel2StudentCities').select2('data')[0].text}</option>`);
            $('#inputFatherAddress').val(null);
            $('#inputFatherDistrict').val(null);
        }
    });

    $('#chkBoxSameAddress2').click(function (e) {
        if (this.checked) {
            $('#inputMotherZipCode').val($('#inputFatherZipCode').val());
            $('#sel2MotherStates').append(`<option value="${$('#sel2FatherStates').select2('data')[0].id}" selected>${$('#sel2FatherStates').select2('data')[0].text}</option>`);
            $('#sel2MotherCities').append(`<option value="${$('#sel2FatherCities').select2('data')[0].id}" selected>${$('#sel2FatherCities').select2('data')[0].text}</option>`);
            $('#inputMotherAddress').val($('#inputFatherAddress').val());
            $('#inputMotherDistrict').val($('#inputFatherDistrict').val());
        } else {
            $('#inputMotherZipCode').val(null);
            $('#sel2MotherStates').append(`<option value="${$('#sel2FatherStates').select2('data')[0].id}" selected>${$('#sel2FatherStates').select2('data')[0].text}</option>`);
            $('#sel2MotherCities').append(`<option value="${$('#sel2FatherCities').select2('data')[0].id}" selected>${$('#sel2FatherCities').select2('data')[0].text}</option>`);
            $('#inputMotherAddress').val(null);
            $('#inputMotherDistrict').val(null);
        }
    });

    $('#inputStudentSSN').kendoMaskedTextBox({
        mask: "000-000-000-00"
    });

    $('#inputFatherSSN').kendoMaskedTextBox({
        mask: "000-000-000-00"
    });

    $('#inputMotherSSN').kendoMaskedTextBox({
        mask: "000-000-000-00"
    });

    $("#inputStudentZipCode").kendoMaskedTextBox({
        mask: "00000-000"
    });

    $("#inputFatherZipCode").kendoMaskedTextBox({
        mask: "00000-000"
    });

    $("#inputMotherZipCode").kendoMaskedTextBox({
        mask: "00000-000"
    });

    $("#inputStudentPhone").kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });

    $("#inputStudentCelPhone").kendoMaskedTextBox({
        mask: "(99) 90000-0000"
    });

    $("#inputFatherPhone").kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });

    $("#inputFatherComPhone").kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });

    $("#inputFatherCelPhone").kendoMaskedTextBox({
        mask: "(99) 90000-0000"
    });

    $("#inputMotherPhone").kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });

    $("#inputMotherComPhone").kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });

    $("#inputMotherCelPhone").kendoMaskedTextBox({
        mask: "(99) 90000-0000"
    });

    $('#btnSend').click(function (e) {
        if (e.clientX === 0) {
            return false;
        }
        e.preventDefault();

        let $this = $(this);

        $this.prop('disabled', true);

        let params = {
            newStudent: $('input[name=chkBoxStudent]:checked').val(),
            studentName: $('#inputStudentName').val(),
            studentCode: $('#inputStudentCode').val(),
            studentBDate: moment($('#kdpStudentBDate').val()).format('DD/MM/YYYY'),
            studentGroup: $('#inputStudentGroup').val(),
            studentShift: $('#inputStudentShift').val(),
            studentBirthTown: $('#inputBirthTown').val(),
            studentZipCode: $('#inputStudentZipCode').val(),
            studentState: $('#sel2StudentStates').select2('data')[0].text,
            studentCity: $('#sel2StudentCities').select2('data')[0].text,
            studentAddress: $('#inputStudentAddress').val(),
            studentDistrict: $('#inputStudentDistrict').val(),
            studentPhone: $('#inputStudentPhone').val(),
            studentCelPhone: $('#inputStudentCelPhone').val(),
            studentBirthRegisterTerm: $('#inputBirthRegisterTerm').val(),
            studentBirthRegisterSheet: $('#inputBirthRegisterSheet').val(),
            studentBirthRegisterBook: $('#inputBirthRegisterBook').val(),
            studentBirthRegisterDate: moment($('#kdpStudentRegister').val()).format('DD/MM/YYYY'),
            studentBirthRegisterPlaceName: $('#inputBirthRegisterPlaceName').val(),
            curriculum: $('#inputCurriculum').val(), // .replace(/[^\/\d]/g, ''),
            studentEmail: $('#inputStudentEmail').val(),
            fatherName: $('#inputFatherName').val(),
            fatherProfission: $('#inputFatherProfission').val(),
            fatherState: $('#sel2FatherStates').select2('data')[0].text,
            fatherCity: $('#sel2FatherCities').select2('data')[0].text,
            fatherAddress: $('#inputFatherAddress').val(),
            fatherDistrict: $('#inputFatherDistrict').val(),
            fatherEmail: $('#inputFatherEmail').val(),
            fatherZipCode: $('#inputFatherZipCode').val(),
            fatherIdentity: $('#inputFatherIdentity').val(),
            fatherSSN: $('#inputStudentEmail').val(),
            fatherBDate: moment($('#kdpFatherBDay').val()).format('DD/MM/YYYY'),
            fatherPhone: $('#inputFatherPhone').val(),
            fatherComPhone: $('#inputFatherComPhone').val(),
            fatherCelPhone: $('#inputFatherCelPhone').val(),
            motherName: $('#inputFatherName').val(),
            motherProfission: $('#inputFatherProfission').val(),
            motherState: $('#sel2FatherStates').select2('data')[0].text,
            motherCity: $('#sel2FatherCities').select2('data')[0].text,
            motherAddress: $('#inputFatherAddress').val(),
            motherDistrict: $('#inputFatherDistrict').val(),
            motherEmail: $('#inputFatherEmail').val(),
            motherZipCode: $('#inputFatherZipCode').val(),
            motherIdentity: $('#inputMotherIdentity').val(),
            motherSSN: $('#inputStudentEmail').val(),
            motherBDate: moment($('#kdpFatherBDay').val()).format('DD/MM/YYYY'),
            motherPhone: $('#inputFatherPhone').val(),
            motherComPhone: $('#inputFatherComPhone').val(),
            motherCelPhone: $('#inputFatherCelPhone').val()
        };

        $.ajax({
            type: 'POST',
            url: '/sendStudentInfo',
            data: params
        }).done(function (data) {
            if (!data.error) {
                swal({
                    title: "Sucesso!",
                    text: "Sua matricula foi enviada. Aguarde o contato da nossa secretaria.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                    timer: 2000
                }).then(
                    function () {
                        window.open("/");
                    },
                    // handling the promise rejection
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            console.log('I was closed by the timer');
                            window.open("/");
                        }
                    }
                );
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR.responseText);
        }).always(function () {
            $this.html('Enviar').prop('disabled', false);
        });

    });

});