// Checkbox:
// ---------
// Give a checkbox input a `data-toggle-element` of the selector you wish to hide/show
// as that checkbox is checked/unchecked.

// Radio button:
// -------------
// Give all related radio button inputs a `data-toggle-element` of the selector that selects
// all the possible elements you wish to hide/show based on the value of the radio button.
// There should be one element per possible value of the radio button.
// Give each of the elements that you wish to hide/show a `data-toggle-element-value` that corresponds
// to a possible value of the aforementioned radio button group.

// Select:
// -------
// Give a select tag a `data-toggle-element` of the selector that selects all the possible
// elements you wish to hide/show based on the value of the select.
// There should be one element per possible value of the select.
// Give each of the elements that you wish to hide/show a `data-toggle-element-value` that corresponds
// to a possible value of the aforementioned select.
// Add a `data-toggle-element-value-none` for an element to be shown when no selection is made.
// Add a `data-toggle-element-value-any` for an element to be shown when _any_ selection is made.

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
