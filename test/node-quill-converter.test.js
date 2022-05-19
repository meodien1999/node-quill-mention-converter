const {
    convertTextToDelta,
    convertHtmlToDelta,
    convertDeltaToHtml
} = require('../lib/index.js');

describe('node-quill-converter', () => {
    it('convertTextToDelta', () => {
        let text = 'hello, world';
        let deltaExpected = { ops: [{ insert: 'hello, world\n' }] };

        let deltaResult = convertTextToDelta(text);

        expect(deltaResult).toEqual(deltaExpected);
    });

    it('convertHtmlToDelta', () => {
        let html = `<p><span class="mention" data-denotation-char="" data-id="12312" data-value="12312" data-color="#444" data-background="#efefef" style="color: rgb(68, 68, 68); background: rgb(239, 239, 239);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>12312</span>﻿</span> <span class="mention" data-denotation-char="" data-id="35650" data-value="Ngày (Datetime)" data-color="white" data-background="#3699ff" style="color: white; background: rgb(54, 153, 255);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>Ngày (Datetime)</span>﻿</span> <span class="mention" data-denotation-char="" data-id="213123123 1" data-value="213123123 1" data-color="#444" data-background="#efefef" style="color: rgb(68, 68, 68); background: rgb(239, 239, 239);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>213123123 1</span>﻿</span> <span class="mention" data-denotation-char="" data-id="35650" data-value="Ngày (Datetime)" data-color="white" data-background="#3699ff" style="color: white; background: rgb(54, 153, 255);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>Ngày (Datetime)</span>﻿</span> <span class="mention" data-denotation-char="" data-id="1w213" data-value="1w213" data-color="#444" data-background="#efefef" style="color: rgb(68, 68, 68); background: rgb(239, 239, 239);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>1w213</span>﻿</span> <span class="mention" data-denotation-char="" data-id="35650" data-value="Ngày (Datetime)" data-color="white" data-background="#3699ff" style="color: white; background: rgb(54, 153, 255);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>Ngày (Datetime)</span>﻿</span> <span class="mention" data-denotation-char="" data-id="5yyyyyyyy" data-value="5yyyyyyyy" data-color="#444" data-background="#efefef" style="color: rgb(68, 68, 68); background: rgb(239, 239, 239);">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>5yyyyyyyy</span>﻿</span> 3213123</p>`;
        let deltaExpected = {
            ops: [{
                    insert: "hello, "
                },
                {
                    insert: "world",
                    attributes: {
                        bold: true
                    }
                }
            ]
        };

        let deltaResult = convertHtmlToDelta(html);

        expect(deltaResult).toEqual(deltaExpected);
    });

    it('convertHtmlToDelta', () => {
        let delta = {
            ops: [{
                    insert: "hello, "
                },
                {
                    insert: "world",
                    attributes: {
                        bold: true
                    }
                }
            ]
        };

        let htmlExpected = `<p>hello, <strong>world</strong></p>`;
        let htmlResult = convertDeltaToHtml(delta);

        expect(htmlResult).toEqual(htmlExpected);
    });

    it('GitHub Issue #2', () => {
        let issueDeltaJSON = "{\"ops\":[{\"insert\":\"first\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"second\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"next level\"},{\"attributes\":{\"indent\":1,\"list\":\"ordered\"},\"insert\":\"\\n\"}]}"
        let delta = JSON.parse(issueDeltaJSON);

        let htmlExpected = "<ol><li>first</li><li>second</li><li class=\"ql-indent-1\">next level</li></ol>";
        let htmlResult = convertDeltaToHtml(delta);

        expect(htmlResult).toEqual(htmlExpected);
    });
});