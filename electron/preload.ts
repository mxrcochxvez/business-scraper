import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('babbageLeadScraper', {
  version: '0.1.0',
});
