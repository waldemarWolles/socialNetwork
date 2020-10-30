import { create } from 'react-test-renderer';
import React from 'react';
import ProfileStatus from './ProfileStatus';

test ('input should be displayed in editMode instead of span', () => {

    const component = create(<ProfileStatus status='it-kamasutra'/>);
    const root = component.root;
    let span = root.findByType('span');
    span.props.onDoubleClick();
    let input = root.findByType('input');
    expect(input.props.value).toBe('it-kamasutra');
});