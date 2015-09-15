module.exports = function (Student) {

  Student.greet = function (msg, cb) {
    cb(null, 'Hello world... ' + msg);
  }

  Student.remoteMethod(
    'greet',
    {
      accepts: {arg: 'msg', type: 'string'},
      returns: {arg: 'greeting', type: 'string'},
      http: {path: '/saludo', verb: 'get'}
    }
  );

  Student.observe('before save', function (ctx, next) {

    if (ctx.isNewInstance) {
      var date = new Date();
      ctx.instance.created = date;
    }

    console.log(ctx.instance, ctx.isNewInstance);
    next();

  });

};
