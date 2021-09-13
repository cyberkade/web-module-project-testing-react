import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display'
import { waitFor } from '@testing-library/dom';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow')

// import { displayFun } from '../Display'

const testShow = {
    name: 'Bungo',
    summary: 'Bungos Jumbo',
    seasons: [
        {
            id: 0,
            name:'Season 1',
            episodes: []
        },
        {
            id: 1,
            name:'Season 2',
            episodes: []
        },
        {
            id: 2,
            name:'Season 3',
            episodes: []
        }
    ]
  }

test('renders without errors', () => {
    render(<Display/>)
})

test('clicking the button fetches shows and displays a component containing shows data', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display/>)

    const button = screen.getByRole("button");

    userEvent.click(button);

    const shows = await screen.findByTestId("show-container");

    expect(shows).toBeInTheDocument();
})

test('the amount of selected options rendered is equal to the amount of seasons in data', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

   render(<Display/>)

    const button = screen.getByRole("button");

    userEvent.click(button);

    const options = await screen.findAllByTestId("season-option");

    expect(options).toHaveLength(testShow.seasons.length);
})

test('the amount of selected options rendered is equal to the amount of seasons in data', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)
    
    const mockDisplayFunc = jest.fn();

    render(<Display displayFunc={mockDisplayFunc}/>)

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(()=>{
        expect(mockDisplayFunc).toHaveBeenCalled()
        expect(mockDisplayFunc).toBeCalledTimes(1);
    })
})



///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.