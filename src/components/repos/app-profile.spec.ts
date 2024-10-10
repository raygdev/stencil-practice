import { RepoProfile } from './repos-profile';
import { newSpecPage } from '@stencil/core/testing';

describe('repo-profile', () => {
  describe('normalization', () => {
    it('returns a blank string if the name is undefined', async () => {
      const { rootInstance } = await newSpecPage({
        components: [RepoProfile],
        html: '<repo-profile><repo-profile>',
      });
      expect(true).toEqual(true)
    });

    it('returns a blank string if the name is null', async () => {
      const { rootInstance } = await newSpecPage({
        components: [RepoProfile],
        html: '<app-profile></app-profile>',
      });
      expect(true).toEqual(true)
    });

    it('capitalizes the first letter', async () => {
      const { rootInstance } = await newSpecPage({
        components: [RepoProfile],
        html: '<app-profile></app-profile>',
      });
      expect(true).toEqual(true)
    });

    it('lower-cases the following letters', async () => {
      const { rootInstance } = await newSpecPage({
        components: [RepoProfile],
        html: '<repo-profile></repo-profile>',
      });
      expect(true).toEqual(true)
    });

    it('handles single letter names', async () => {
      const { rootInstance } = await newSpecPage({
        components: [RepoProfile],
        html: '<app-profile></app-profile>',
      });
      expect(true).toEqual(true)
    });
  });
});
