import { Project, SyntaxKind } from 'ts-morph';
import * as path from 'path';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('src/data/topics.ts');

const topicsVar = sourceFile.getVariableDeclarationOrThrow('TOPICS');
const objLiteral = topicsVar.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
const properties = objLiteral.getProperties().filter(p => p.isKind(SyntaxKind.PropertyAssignment));

const topicsMap = {};
for (const prop of properties) {
  const name = prop.getName();
  const text = prop.getInitializer().getText();
  topicsMap[name] = text;
}

const getConst = (name) => {
  const v = sourceFile.getVariableStatement(s => s.getDeclarations().some(d => d.getName() === name));
  return v ? v.getText() : '';
};

// Extracted constants
const tableConsts = ['TD', 'TDR', 'TH', 'THR', 'TDQ', 'TRTOT', 'TDTL', 'TDTR', 'TABLE_TRANSPORT', 'TABLE_TOURISM', 'TABLE_INTERNET'];
const symConsts = ['COND_SYM_1', 'COND_SYM_2'];
const logicConsts = ['TL_TH', 'TL_TD', 'TL_NO', 'TL_YES', 'TL_AMB', 'TABLE_LOGIC_1', 'TABLE_LOGIC_2', 'TABLE_LOGIC_3', 'COND_LOGIC'];

function writeTopicFile(filePath, topicMappings, constNames) {
  const newFile = project.createSourceFile(filePath, '', { overwrite: true });
  newFile.addImportDeclaration({
    isTypeOnly: true,
    namedImports: ['Topic'],
    moduleSpecifier: '../../types',
  });

  if (constNames) {
    const text = constNames.map(getConst).join('\n\n');
    newFile.addStatements(text);
  }

  for (const [exportName, origName] of topicMappings) {
    const content = topicsMap[origName];
    newFile.addVariableStatement({
      isExported: true,
      declarations: [{
        name: exportName,
        type: 'Topic',
        initializer: content,
      }],
    });
  }
}

writeTopicFile('src/data/topics/series.ts', [['series', 'series']]);
writeTopicFile('src/data/topics/math.ts', [['math', 'math']]);
writeTopicFile('src/data/topics/table.ts', [['table', 'table']], tableConsts);
writeTopicFile('src/data/topics/sym.ts', [['sym', 'sym']], symConsts);
writeTopicFile('src/data/topics/logic.ts', [['logic', 'logic']], logicConsts);
writeTopicFile('src/data/topics/thai.ts', [['sentences', 'sentences'], ['article', 'article']]);
writeTopicFile('src/data/topics/english.ts', [['en_conv', 'en_conv'], ['en_gram', 'en_gram'], ['en_read', 'en_read']]);
writeTopicFile('src/data/topics/law.ts', [['law_admin', 'law_admin'], ['law_procedure', 'law_procedure'], ['law_governance', 'law_governance'], ['law_ethics', 'law_ethics']]);

// Now update src/data/topics.ts
sourceFile.removeText();
sourceFile.addImportDeclaration({
  isTypeOnly: true,
  namedImports: ['Topic'],
  moduleSpecifier: '../types',
});
sourceFile.addImportDeclaration({ namedImports: ['series'], moduleSpecifier: './topics/series' });
sourceFile.addImportDeclaration({ namedImports: ['math'], moduleSpecifier: './topics/math' });
sourceFile.addImportDeclaration({ namedImports: ['table'], moduleSpecifier: './topics/table' });
sourceFile.addImportDeclaration({ namedImports: ['sym'], moduleSpecifier: './topics/sym' });
sourceFile.addImportDeclaration({ namedImports: ['logic'], moduleSpecifier: './topics/logic' });
sourceFile.addImportDeclaration({ namedImports: ['sentences', 'article'], moduleSpecifier: './topics/thai' });
sourceFile.addImportDeclaration({ namedImports: ['en_conv', 'en_gram', 'en_read'], moduleSpecifier: './topics/english' });
sourceFile.addImportDeclaration({ namedImports: ['law_admin', 'law_procedure', 'law_governance', 'law_ethics'], moduleSpecifier: './topics/law' });

const allTopics = ['series', 'math', 'table', 'sym', 'logic', 'sentences', 'article', 'en_conv', 'en_gram', 'en_read', 'law_admin', 'law_procedure', 'law_governance', 'law_ethics'];

sourceFile.addVariableStatement({
  isExported: true,
  declarations: [{
    name: 'TOPICS',
    type: 'Record<string, Topic>',
    initializer: `{\n  ${allTopics.join(',\n  ')}\n}`,
  }],
});

project.saveSync();
console.log('Refactoring complete.');
