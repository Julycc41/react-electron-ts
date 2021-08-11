import { AlignmentType, convertInchesToTwip, Document, HorizontalPositionAlign, HorizontalPositionRelativeFrom, ImageRun, Packer, Paragraph, Table, TableCell, TableRow, TextWrappingSide, TextWrappingType, VerticalAlign, VerticalPositionAlign, VerticalPositionRelativeFrom, WidthType } from "docx";
import { saveAs } from 'file-saver';

export const get11 = (ss: any) => {

    const tableList = [
        { "untreated": 429, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 0, "count": 429, "blank": "点状热斑" },
        { "untreated": 75, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 1, "count": 75, "blank": "条状热斑" },
        { "untreated": 83, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 2, "count": 83, "blank": "多斑" },
        { "untreated": 0, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 3, "count": 0, "blank": "空载" },
        { "untreated": 0, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 4, "count": 0, "blank": "缺失" },
        { "untreated": 53, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 5, "count": 53, "blank": "遮挡" },
        { "untreated": 6, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 6, "count": 6, "blank": "其它" },
        { "untreated": 646, "confirmed": 0, "error": 0, "repetition": 0, "cannotCope": 0, "rest": 0, "key": 7, "count": 646, "blank": "总计" }
    ]
    const title = [
        { "title": "", "dataIndex": "blank", "key": "blank" },
        { "title": "未处理", "dataIndex": "untreated", "type": 0, "key": "untreated" },
        { "title": "已消缺", "type": 1, "dataIndex": "confirmed", "key": "confirmed" },
        { "title": "错误", "type": 2, "dataIndex": "error", "key": "error" },
        { "title": "重复", "type": 3, "dataIndex": "repetition", "key": "repetition" },
        { "title": "无法处理", "type": 4, "dataIndex": "cannotCope", "key": "cannotCope" },
        { "title": "其他", "type": 5, "dataIndex": "rest", "key": "rest" },
        { "title": "总计", "dataIndex": "count", "key": "count" }]

    const table1 = title.map((item) => {
        return new TableCell({
            children: [new Paragraph({
                text: item.title, alignment: AlignmentType.CENTER,
            })],
            verticalAlign: VerticalAlign.CENTER,
        })
    })

    // const tablesss = new Table({
    //     alignment: AlignmentType.CENTER,
    //     rows: [
    //         { height: 100, rule: 100 },

    //         new TableRow({
    //             children: [
    //                 ...table1,

    //             ],
    //         }),

    //         ...tableList.map((row: any) =>
    //             new TableRow({
    //                 children: Object.keys(row).filter((item) => item !== "key").reverse().map(
    //                     (cell, index) => {
    //                         return new TableCell({
    //                             children: [
    //                                 new Paragraph({

    //                                     text: row[cell].toString() || 0,
    //                                     alignment: AlignmentType.CENTER,
    //                                 }),
    //                             ],

    //                             verticalAlign: VerticalAlign.CENTER,
    //                         })
    //                     }
    //                 ) as any
    //             }) as any),
    //     ],
    //     width: {
    //         size: convertInchesToTwip(7),
    //         type: WidthType.DXA,
    //     },
    //     margins: {
    //         top: convertInchesToTwip(0.1),
    //         bottom: convertInchesToTwip(0.1),
    //         right: convertInchesToTwip(0.1),
    //         left: convertInchesToTwip(0.1),
    //     },
    // });
    const imageBase64Data = `iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAACzVBMVEUAAAAAAAAAAAAAAAA/AD8zMzMqKiokJCQfHx8cHBwZGRkuFxcqFSonJyckJCQiIiIfHx8eHh4cHBwoGhomGSYkJCQhISEfHx8eHh4nHR0lHBwkGyQjIyMiIiIgICAfHx8mHh4lHh4kHR0jHCMiGyIhISEgICAfHx8lHx8kHh4jHR0hHCEhISEgICAlHx8kHx8jHh4jHh4iHSIhHCEhISElICAkHx8jHx8jHh4iHh4iHSIhHSElICAkICAjHx8jHx8iHh4iHh4hHiEhHSEkICAjHx8iHx8iHx8hHh4hHiEkHSEjHSAjHx8iHx8iHx8hHh4kHiEkHiEjHSAiHx8hHx8hHh4kHiEjHiAjHSAiHx8iHx8hHx8kHh4jHiEjHiAjHiAiICAiHx8kHx8jHh4jHiEjHiAiHiAiHSAiHx8jHx8jHx8jHiAiHiAiHiAiHSAiHx8jHx8jHx8iHiAiHiAiHiAjHx8jHx8jHx8jHx8iHiAiHiAiHiAjHx8jHx8jHx8iHx8iHSAiHiAjHiAjHx8jHx8hHx8iHx8iHyAiHiAjHiAjHiAjHh4hHx8iHx8iHx8iHyAjHSAjHiAjHiAjHh4hHx8iHx8iHx8jHyAjHiAhHh4iHx8iHx8jHyAjHSAjHSAhHiAhHh4iHx8iHx8jHx8jHyAjHSAjHSAiHh4iHh4jHx8jHx8jHyAjHyAhHSAhHSAiHh4iHh4jHx8jHx8jHyAhHyAhHSAiHSAiHh4jHh4jHx8jHx8jHyAhHyAhHSAiHSAjHR4jHh4jHx8jHx8hHyAhHyAiHSAjHSAjHR4jHh4jHx8hHx8hHyAhHyAiHyAjHSAjHR4jHR4hHh4hHx8hHyAiHyAjHyAjHSAjHR4jHR4hHh4hHx8hHyAjHyAjHyAjHSAjHR4hHR4hHR4hHx8iHyAjHyAjHyAjHSAhHR4hHR4hHR4hHx8jHyAjHyAjHyAjHyC9S2xeAAAA7nRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxgZGhscHR4fICEiIyQlJicoKSorLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZISUpLTE1OUFFSU1RVVllaW1xdXmBhYmNkZWZnaGprbG1ub3Byc3R1dnd4eXp8fn+AgYKDhIWGiImKi4yNj5CRkpOUlZaXmJmam5ydnp+goaKjpKaoqqusra6vsLGys7S1tri5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+fkZpVQAABcBJREFUGBntwftjlQMcBvDnnLNL22qzJjWlKLHFVogyty3SiFq6EZliqZGyhnSxsLlMRahYoZKRFcul5dKFCatYqWZaNKvWtrPz/A2+7/b27qRzec/lPfvl/XxgMplMJpPJZDKZAtA9HJ3ppnIez0KnSdtC0RCNznHdJrbrh85wdSlVVRaEXuoGamYi5K5430HNiTiEWHKJg05eRWgNfKeV7RxbqUhGKPV/207VupQ8is0IoX5vtFC18SqEHaK4GyHTZ2kzVR8PBTCO4oANIZL4ShNVZcOhKKeYg9DoWdhI1ec3os2VFI0JCIUez5+i6st0qJZRrEAIJCw+QdW223BG/EmKwTBc/IJ/qfp2FDrkUnwFo8U9dZyqnaPhxLqfYjyM1S3vb6p+GGOBszsojoTDSDFz6qj66R4LzvYJxVMwUNRjf1H1ywQr/megg2RzLximy8waqvbda8M5iijegVEiHjlM1W/3h+FcXesphsMY4dMOUnUgOxyuPEzxPQwRNvV3qg5Nj4BreyimwADWe/dRVTMjEm6MoGLzGwtystL6RyOY3qSqdlYU3FpLZw1VW0sK5943MvUCKwJ1noNtjs6Ohge76Zq9ZkfpigU5WWkDYuCfbs1U5HWFR8/Qq4a9W0uK5k4ZmdrTCl8spGIePLPlbqqsc1Afe83O0hULc8alDYiBd7ZyitYMeBfR55rR2fOKP6ioPk2dGvZ+UVI0d8rtqT2tcCexlqK2F3wRn5Q+YVbBqrLKOupkr9lZujAOrmS0UpTb4JeIPkNHZ+cXr6uoPk2vyuBSPhWLEKj45PQJuQWryyqP0Z14uGLdROHIRNBEXDR09EP5r62rOHCazhrD4VKPwxTH+sIA3ZPTJ+YuWV22n+IruHFDC8X2CBjnPoolcGc2FYUwzmsUWXDHsoGKLBhmN0VvuBVfTVE/AAbpaid5CB4MbaLY1QXGuIViLTyZQcVyGGMuxWPwaA0Vk2GI9RRp8Ci2iuLkIBjhT5LNUfAspZFiTwyC72KK7+DNg1SsRvCNp3gZXq2k4iEEXSHFJHgVXUlxejCCbTvFAHiXdIJiXxyCK7KJ5FHoMZGK9xBcwyg2QpdlVMxEUM2iyIMuXXZQNF+HswxMsSAAJRQjoE//eoqDCXBSTO6f1xd+O0iyNRY6jaWi1ALNYCocZROj4JdEikroVkjFk9DcStXxpdfCD2MoXodu4RUU9ptxxmXssOfxnvDVcxRTod9FxyhqLoAqis5aPhwTDp9spRgEH2Q6KLbYoKqlaKTm6Isp0C/sJMnjFvhiERXPQvUNRe9p29lhR04CdBpC8Sl8YiuncIxEuzUUg4Dkgj+paVozygY9plPMh28SaymO9kabAopREGF3vt9MzeFFl8G7lRSZ8FFGK8XX4VA8QjEd7XrM3M0OXz8YCy+qKBLgq3wqnofiTorF0Ax56Rg1J1elW+BBAsVe+My6iYq7IK6keBdOIseV2qn5Pb8f3MqkWAXf9ThM8c8lAOIotuFsF875lRrH5klRcG0+xcPwQ1oLxfeRAP4heQTnGL78X2rqlw2DK59SXAV/zKaiGMAuko5InCt68mcOan5+ohf+z1pP8lQY/GHZQMV4YD3FpXDp4qerqbF/lBWBswyi+AL+ia+maLgcRRQj4IYlY/UpauqKBsPJAxQF8NM1TRQ/RudSPAD34rK3scOuR8/HGcspxsJfOVS8NZbiGXiUtPgINU3v3WFDmx8pEuG3EiqKKVbCC1vm2iZqap5LAtCtleQf8F9sFYWDohzeJczYyQ4V2bEZFGsQgJRGqqqhS2phHTWn9lDkIhBTqWqxQZ+IsRvtdHY9AvI2VX2hW68nfqGmuQsCEl3JdjfCF8OW1bPdtwhQ0gm2mQzfRE3a7KCYj0BNZJs8+Kxf/r6WtTEI2FIqlsMfFgRB5A6KUnSe/vUkX0AnuvUIt8SjM1m6wWQymUwmk8lkMgXRf5vi8rLQxtUhAAAAAElFTkSuQmCC`;


    const image = new ImageRun({
        data: Buffer.from(imageBase64Data, "base64"),
        transformation: {
            width: 500,
            height: 700,
        },
        floating: {
            zIndex: 10,
            horizontalPosition: {
                relative: HorizontalPositionRelativeFrom.PAGE,
                align: HorizontalPositionAlign.RIGHT,
            },
            verticalPosition: {
                relative: VerticalPositionRelativeFrom.MARGIN,
                align: VerticalPositionAlign.TOP,
            },
            wrap: {
                type: TextWrappingType.SQUARE,
                side: TextWrappingSide.BOTH_SIDES,
            },
            margins: {
                top: 201440,
            },
        },
    });
    const table = new Table({
        indent: {
            size: 600,
            type: WidthType.DXA,
        },
        // columnWidths: [450, 450],
        // layout: TableLayoutType.FIXED,
        // indent: {
        //     size: 600,
        //     type: WidthType.DXA,
        // },
        rows: [
            // {
            //     height: 1000,
            //      rule: 1000
            // },
            new TableRow({

                children: [
                    new TableCell({
                        margins: {
                            top: convertInchesToTwip(0.1),
                            bottom: convertInchesToTwip(0.1),
                            left: convertInchesToTwip(0.1),
                            right: convertInchesToTwip(0.1),
                        },
                        // columnSpan: 3,
                        children: [new Paragraph("43242423434")],
                    }),
                    new TableCell({
                        children: [],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [new Paragraph("World")],
                    }),
                ],
            }),
        ],
    } as any);


    const doc = new Document({


        sections: [

            {

                children: [
                    new TableCell({
                        children: [new Paragraph("World")],
                    }),
                    image
                ]
            },
        ],
    });

    Packer.toBlob(doc).then((buffer: any) => {
        saveAs(buffer, new Date().getTime().toString());
    });

}