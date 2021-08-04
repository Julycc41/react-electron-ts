import simpletoc from 'simpletoc'
export const getimg=()=>{
    simpletoc.domToc({
        // Only search for content in a specific place.
        root: '.get-image-wrapper',
        // Only use headings from 1 to 3 levels.
        selector: 'h1, h2, h3',
        // Where to place the generated Table of Contents.
        target: '.table-of-contents-placeholder',
        // Use an unordered list (bullet list, no numbers).
        type: 'ul',
      })
      
}