import React from 'react'
import * as Acron from 'acorn'
import * as AcronJXS from 'acorn-jsx'

const JsxParser = (props) => {
    const { jsx, components, bindings } = props;

    const Parse = Acron.Parser.extend(AcronJXS())
    const ast = Parse.parse(jsx)
    const code = ast.body[0].expression

    const parseExpression = (node) => {
        switch (node.type) {
            case 'JSXElement':
                return parseElement(node)
            case 'ConditionalExpression':
                return parseExpression(node.test) ? parseExpression(node.consequent) : parseExpression(node.alternate)
            case 'BinaryExpression':
                switch (node.operator) {
                    case '-': return parseExpression(node.left) - parseExpression(node.right)
                    case '!=': return parseExpression(node.left) != parseExpression(node.right)
                    case '!==': return parseExpression(node.left) !== parseExpression(node.right)
                    case '*': return parseExpression(node.left) * parseExpression(node.right)
                    case '**': return parseExpression(node.left) ** parseExpression(node.right)
                    case '/': return parseExpression(node.left) / parseExpression(node.right)
                    case '%': return parseExpression(node.left) % parseExpression(node.right)
                    case '+': return parseExpression(node.left) + parseExpression(node.right)
                    case '<': return parseExpression(node.left) < parseExpression(node.right)
                    case '<=': return parseExpression(node.left) <= parseExpression(node.right)
                    case '==': return parseExpression(node.left) == parseExpression(node.right)
                    case '===': return parseExpression(node.left) === parseExpression(node.right)
                    case '>': return parseExpression(node.left) > parseExpression(node.right)
                    case '>=': return parseExpression(node.left) >= parseExpression(node.right)
                }
                return undefined
            case 'Literal':
            case 'JSXText':
            case 'JSXIdentifier':
                return node.value 
            case 'Identifier':
                const n = node.name
                if(n === 'type') {
                    console.log(n)
                    console.log(bindings[n])
                }
                return bindings[n]
            case 'StringLiteral':
                return node.value
            case 'UnaryExpression':
                switch (node.operator) {
                    case '+': return node.argument.value
                    case '-': return -node.argument.value
                    case '!': return !node.argument.value
                }
                return undefined
            case 'JSXExpressionContainer':
                return parseExpression(node.expression)
        }
    }

    const parseElement = (node) => {

        const tagName = node.openingElement.name.name
        const tag = components[tagName] || tagName 
    
        const myProps = {}
        const attribute = node.openingElement.attributes

        attribute.forEach(n => {
            myProps[n.name.name] = parseExpression(n.value)
        })

        const children = node.children.map(node => {
            return parseExpression(node)
        })

        return React.createElement(tag,myProps,...children)
    }

    return (
        <>
            {parseExpression(code)}
        </>
    )
}

export default JsxParser