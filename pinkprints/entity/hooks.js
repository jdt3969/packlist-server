exports.before = ({ context, helpers }) => {
  const { pascalcase, camelcase } = helpers;

  context.name = pascalcase(context.name);
  context.path = camelcase(context.path);
};
