import React from 'react'
import * as Acron from 'acorn'
import * as AcronJXS from 'acorn-jsx'

const JsxParser = (props) => {
    const { jsx, components, bindings } = props;

    const Parse = Acron.Parser.extend(AcronJXS())
    const ast = Parse.parse(jsx)
    const code = ast.body[0].expression

    const astToJSX = (astCode) => {

        if(astCode.type === 'JSXExpressionContainer') {
            const n = astCode.expression.name
            return bindings[n] 
        }
        if(astCode.type === 'JSXText') {
            return astCode.value
        }
    
        const tagName = astCode.openingElement.name.name
        const tag = components[tagName] || tagName 
    
        const myProps = {}
        const attribute = astCode.openingElement.attributes
        attribute.forEach(n => {
            if(n.value.type === 'JSXExpressionContainer') {
                myProps[n.name.name] = bindings[n.value.expression.name] || n.value.expression.name
            } else {
                myProps[n.name.name] = bindings[n.value.value] || n.value.value
            }
        })
    
        const children = astCode.children.map(node => {
            return astToJSX(node)
        })
    
        return React.createElement(tag,myProps,...children)
    }

    return (
        <>
            {astToJSX(code)}
        </>
    )
}

export default JsxParser