import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as multer from 'multer';
import { parse } from 'csv-parse/sync';

@Injectable()
export class UploadFileCSV implements NestMiddleware {
  private storage = multer.memoryStorage();
  private fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) {
    if (file.mimetype === 'text/csv') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
  private upload = multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.upload.single('file')(req, res, async (err: any) => {
      if (err) {
        console.log(err);
      }
      if (req.file) {
        const records = parse(req.file.buffer, {
          columns: (header) => header.map((column: string) => column.trim()),
          skip_empty_lines: true,
        });
        req.body.dataCSV = records;
      }
      next();
    });
  }
}