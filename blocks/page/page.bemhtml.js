block('page').wrap()(function() {

    mode('doctype')(function() {
        return { html : this.ctx.doctype || '<!DOCTYPE html>' };
    });

    return [
        apply('doctype'),
        {
            tag: 'html',
            attrs : { lang : this.ctx.lang },
            content : [
                {
                    elem : 'head',
                    content : [
                        { tag : 'meta', attrs : { charset : 'utf-8' } },
                        this.ctx.uaCompatible === false? '' : {
                            tag : 'meta',
                            attrs : {
                                'http-equiv' : 'X-UA-Compatible',
                                content : this.ctx.uaCompatible || 'IE=edge'
                            }
                        },
                        { tag : 'title', content : this.ctx.title },
                        this.ctx.head,
                        this.ctx.styles,
                        this.ctx.favicon ? { elem : 'favicon', url : this.ctx.favicon } : ''
                    ]
                },
                this.ctx.content,
                this.ctx.scripts
            ]
        }
    ];
});
