$(document).ready(function() {

    $.validator.setDefaults({
        // errorElement: "p",
        highlight: function(element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid');
        },
        errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }

    });

    jQuery.validator.addMethod("normalizer", function(value, element) {
            return this.optional(element) || $.trim(value);
        });

    $('#registration-form, #userUpdateForm').validate({
        rules: {
            uname: {
                required: true,
                minlength: 4,
                maxlength: 12,
                nowhitespace: true,
                normalizer: true
            },
            fname: {
                required: true,
                minlength: 2,
                maxlength: 10,
                lettersonly: true,
                nowhitespace: true,
                normalizer: true
            },
            lname: {
                required: true,
                minlength: 2,
                maxlength: 12,
                lettersonly: true,
                nowhitespace: true,
                normalizer: true
            },
            email: {
                required: true,
                email: true,
                nowhitespace: true,
                normalizer: true
            },
            pass: {
                required: true,
                minlength: 4,
                maxlength: 15,
                nowhitespace: true,
                normalizer: true
            },
            confpass: {
                required: true,
                equalTo: "#pass"
            },
            tac: "required"
        },

        messages: {
            tac: "Please accept our Terms and Conditions"
        }
    });
});
