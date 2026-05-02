import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../pages/App';

describe('App Component', () => {
	it('renders without crashing', () => {
		const { container } = render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(container).toBeDefined();
	});
});