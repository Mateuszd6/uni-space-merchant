#!/bin/sh

export TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}'
echo "Running tests:"
npx mocha --require ts-node/register 'test/*.{ts,tsx}'
unset TS_NODE_COMPILER_OPTIONS
