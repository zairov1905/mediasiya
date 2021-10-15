import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ],
}];

class Widget extends React.Component {
    state = {
        checked: [],
        expanded: [],
    };

    render() {
        console.log(this.state.checked)
        return (
            <CheckboxTree
            icons={{
                check: <span className="rct-icon rct-icon-check" />,
                uncheck: <span className="rct-icon rct-icon-uncheck" />,
                halfCheck: <span className="rct-icon rct-icon-half-check" />,
                expandClose: <span className="rct-icon rct-icon-expand-close" />,
                expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                expandAll: <span className="rct-icon rct-icon-expand-all" />,
                collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                parentClose: <span className="rct-icon rct-icon-parent-close" />,
                parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                leaf: <span className="rct-icon rct-icon-leaf" />,
            }}

                nodes={this.props.nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
            />
        );
    }
}
export default Widget;