import { container as tsyringeContainer } from 'tsyringe';

export const configureContainer = async () => {
    const container = tsyringeContainer.createChildContainer();
    
    return container 
} 