import postcss from 'postcss';
import { expect } from 'chai';

import plugin from '../';

const test = (input, output, opts, done) => {
	postcss([ plugin(opts) ]).process(input).then((result) => {
		expect(result.css).to.eql(output);
		expect(result.warnings()).to.be.empty;
		done();
	}).catch(done);
};

describe('postcss-nested-media-queries', () => {
	it('all good', (done) => {
		const input =
`@media screen {
    html {
        background: yellow;
    }

    @media (max-width: 1100px) {
        html, body {
            background: green;
        }
    }

    body {
        background: red;
    }
}`;

		const expectedOutput =
`@media screen {
    html {
        background: yellow;
    }
}
@media screen and (max-width: 1100px) {
    html, body {
        background: green;
    }
}
@media screen {
    body {
        background: red;
    }
}`;

		test(input, expectedOutput, {}, done);
	});

	it('`comma` test', (done) => {
		const input =
`@media screen, print {
    @media (max-width: 1100px) {
        .foo {
            color: black
        }
    }
}`;

		const expectedOutput =
`@media screen and (max-width: 1100px), print and (max-width: 1100px) {
    .foo {
        color: black
    }
}`;

		test(input, expectedOutput, {}, done);
	});

	it('`not` test 1', (done) => {
		const input =
`@media not all and (monochrome) {
    @media (max-width: 1100px) {
        .foo {
            color: black
        }
    }
}`;
		const expectedOutput =
`@media (not all and (monochrome)) and (max-width: 1100px) {
    .foo {
        color: black
    }
}`;

		test(input, expectedOutput, {}, done);
	});

	it('`not` test 2', (done) => {
		const input =
`@media (not all) and (monochrome) {
    @media (max-width: 1100px) {
        .foo {
            color: black
        }
    }
}`;

		const expectedOutput =
`@media (not all) and (monochrome) and (max-width: 1100px) {
    .foo {
        color: black
    }
}`;

		test(input, expectedOutput, {}, done);
	});
});
