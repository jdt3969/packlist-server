const path = require('path');
const { lstatSync, readdirSync } = require('fs');

exports.before = ({ context, helpers }) => {
  const { pascalcase, camelcase, pluralize } = helpers;

  context.name = pascalcase(context.name);
  context.camelName = camelcase(context.name);
  context.pluralName = pluralize(context.camelName);

  context.path = camelcase(context.path);

  const dir = path.join(context.dest, context.path, 'src', 'resolvers');
  const isDirectory = (name) => lstatSync(path.join(dir, name)).isDirectory();

  const subDirs = readdirSync(dir).filter(isDirectory);

  context['entities'] = subDirs.sort().map((subDir) => ({
    dirName: subDir,
    resolverName: `${pascalcase(subDir)}Resolver`,
  }));
};
