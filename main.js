module.exports = {
	listen: listen,
	listen_onreturn: listen_onreturn,
	unlisten: unlisten,
	event_keycode: event_keycode,
	event_stop_prop: event_stop_prop,
	event_stop: event_stop,
	in_viewport: in_viewport
};


function event_keycode(ev) {
	ev = ev ? ev : this.event;
	return ev.keyCode ? ev.keyCode : ev.which;
}

function listen(e, name, cb) {
	if(e.addEventListener)
		e.addEventListener(name, cb, false);
	else
		e.attachEvent('on'+name, cb);

	return;
}
function unlisten(e, name, cb) {
	if(e.removeEventListener)
		e.removeEventListener(name, cb, false);
	else
		e.detachEvent('on'+name, cb);

	return;
}
function listen_onreturn(el, cb) {
	listen(el, 'keydown', function(e) {
		if(event_keycode(e) == 13)
			return cb.apply(el);

		return true;
	});
}

function event_stop_prop(e) {
   e = e || window.event;
   e.cancelBubble = true;

   if (e.stopPropagation)
      e.stopPropagation();

   return true;
}

function event_stop(e) {
   event_stop_prop(e);

   e = e || window.event;

   if(e.preventDefault)
      e.preventDefault();
   else
      e.returnValue = false;

   return false;
}


function in_viewport(e) {
	var r = e.getBoundingClientRect();
	return (
		r.bottom >= 0 &&
		r.top <= (window.innerHeight || document.documentElement.clientHeight)
	);
}


