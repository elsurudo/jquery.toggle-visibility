(function ($) {
  $.fn.toggleVisibility = function() {
    const changeFn = function() {
      if ($(this).is(':checkbox')) {
        const el = $($(this).data('toggle-element'));
        $(this).is(':checked') ? el.removeClass('hidden') : el.addClass('hidden');
      } else if ($(this).is(':radio')) {
        const els = $($(this).data('toggle-element'));
        const val = $(this).closest('form').find("input[name='" + $(this).attr('name') + "']:checked").val();
        els.each(function() {
          if ($(this).attr('data-toggle-element-value') == val) {
            $(this).removeClass('hidden');
          } else {
            $(this).addClass('hidden');
          }
        });
      } else if ($(this).is('select')) {
        const els = $($(this).data('toggle-element'));
        const val = $(this).val();
        if (val === '') {
          els.addClass('hidden');
          els.filter('[data-toggle-element-value-none]').removeClass('hidden');
        } else {
          els.filter('[data-toggle-element-value-none]').addClass('hidden');
          els.filter('[data-toggle-element-value-any]').removeClass('hidden');
          els.each(function() {
            if (!!$(this).attr('data-toggle-element-value')) {
              if ($(this).attr('data-toggle-element-value') == val) {
                $(this).removeClass('hidden');
              } else {
                $(this).addClass('hidden');
              }
            }
          });
        }
      }
    }

    // Set hidden/shown state on input change
    $(this).on('change', function (e) {
      changeFn.call(this);
    });

    // Set hidden/shown state on page load
    $(this).each(function() {
      changeFn.call(this);
    });
  };
})(window.jQuery);
