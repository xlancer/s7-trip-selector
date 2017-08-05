import React, { Component } from 'react';
import _ from 'lodash';

class TripSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: null, options: [], display: '', search: '' };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <div>{this.state.selected ? this.state.selected.name : null}</div>

                <input placeholder="Откуда" value={this.state.display} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.onKeyDown} />
                {
                    this.state.options.length > 0 ?
                        <div style={{ border: 'solid 1px black', marginLeft: 'auto', marginRight: 'auto', width: '300px' }}>
                            <ul>
                                {this.state.options.map(item => (<li key={item.iata}>{item.name} {item.iata}</li>))}
                            </ul>
                        </div>
                        : null
                }
            </div>
        );
    }

    setSelected(selected, search) {
        if (selected) {
            this.setState({
                selected: selected,
                options: [],
                display: selected.name,
                search: search
            });
        }
        else {
            this.setState(prevState => ({
                selected: null,
                options: [],
                display: prevState.display,
                search: search
            }));
        }
    }

    onFocus(e) {
        e.target.select();
    }

    onBlur(e) {
        if (this.state.options.length === 0) {
            this.setSelected(null);
        }
        if (this.state.options.length === 1) {
            this.setSelected(this.state.options[0]);
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 13 && this.state.options.length > 0) {
            this.setSelected(this.state.options[0]);
        }
    }

    onChange(e) {
        let value = e.target.value;
        let val = value.toLowerCase();

        let newOptions = !value || !value.length || value.length < 2
            ? []
            : _.filter(this.props.locations, p =>
                p.iata.toLowerCase().includes(val) || p.name.toLowerCase().includes(val));

        this.setState(prevState => ({
            selected: prevState.selected,
            options: newOptions,
            display: value ? value : '',
            search: val
        }));
    }
}

export default TripSelector;
