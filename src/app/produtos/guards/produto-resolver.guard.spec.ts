import { TestBed } from '@angular/core/testing';

import { ProdutoResolverGuard } from './produto-resolver.guard';

describe('ProdutoResolverGuard', () => {
  let guard: ProdutoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProdutoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
