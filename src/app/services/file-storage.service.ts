import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  private disabilityProofFile: File | null = null;

  setDisabilityProof(file: File): void {
    this.disabilityProofFile = file;
  }

  getDisabilityProof(): File | null {
    return this.disabilityProofFile;
  }

  clearDisabilityProof(): void {
    this.disabilityProofFile = null;
  }
}
