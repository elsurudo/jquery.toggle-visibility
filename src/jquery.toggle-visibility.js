(function ($) {
  $.fn.toggleVisibility = function() {
    const changeFn = function() {
      if ($(this).is(':checkbox')) {
        const el = $($(this).data('toggle-element'));
        const invert = $(el).data('toggle-element-invert');
        if (invert) {
          $(this).is(':checked') ? el.addClass('hidden') : el.removeClass('hidden');
        } else {
          $(this).is(':checked') ? el.removeClass('hidden') : el.addClass('hidden');
        }
      } else if ($(this).is(':radio')) {
        const eventElem = this;
        const els = $($(this).data('toggle-element'));
        const val = $("input[name='" + $(this).attr('name') + "']:checked").val();
        els.each(function() {
          const invert = $(this).data('toggle-element-invert');

          if ($(this).attr('data-toggle-element-value') == val) {
            invert ? $(this).addClass('hidden') : $(this).removeClass('hidden');
          } else {
            invert ? $(this).removeClass('hidden') : $(this).addClass('hidden');
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
