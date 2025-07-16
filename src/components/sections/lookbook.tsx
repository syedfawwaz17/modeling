"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleSuggestTransition } from '@/app/actions';

const lookbookSchema = z.object({
  image1: z.any().refine((files) => files?.length === 1, "First image is required."),
  image2: z.any().refine((files) => files?.length === 1, "Second image is required."),
  transitionStyle: z.string().min(3, "Style must be at least 3 characters long."),
});

type LookbookFormValues = z.infer<typeof lookbookSchema>;

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function LookbookSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ description: string; image?: string } | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LookbookFormValues>({
    resolver: zodResolver(lookbookSchema),
  });

  const onSubmit = async (data: LookbookFormValues) => {
    setIsLoading(true);
    setResult(null);

    try {
      const image1DataUri = await fileToDataUri(data.image1[0]);
      const image2DataUri = await fileToDataUri(data.image2[0]);
      
      const response = await handleSuggestTransition({
        image1DataUri,
        image2DataUri,
        transitionStyle: data.transitionStyle,
      });

      if (response.success && response.data) {
        setResult({
          description: response.data.transitionDescription,
          image: response.data.generatedImage,
        });
        toast({ title: "Transition generated!" });
      } else {
        throw new Error(response.error || "Failed to generate transition.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
      const file = e.target.files?.[0];
      if (file) {
          setter(URL.createObjectURL(file));
      }
  }

  return (
    <section id="lookbook" className="bg-secondary">
      <div className="container mx-auto">
        <div className="text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">AI Lookbook</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover creative outfit transitions. Upload two looks and let our AI style a seamless transformation.
            </p>
        </div>
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6 md:p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label htmlFor="image1">Outfit 1</Label>
                             <Input id="image1" type="file" accept="image/*" {...form.register('image1')} onChange={(e) => handleFileChange(e, setPreview1)} />
                             {preview1 && <Image src={preview1} alt="Outfit 1 Preview" width={300} height={400} className="rounded-lg object-cover mx-auto" />}
                             {form.formState.errors.image1 && <p className="text-sm font-medium text-destructive">{form.formState.errors.image1.message as string}</p>}
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="image2">Outfit 2</Label>
                            <Input id="image2" type="file" accept="image/*" {...form.register('image2')} onChange={(e) => handleFileChange(e, setPreview2)} />
                            {preview2 && <Image src={preview2} alt="Outfit 2 Preview" width={300} height={400} className="rounded-lg object-cover mx-auto" />}
                            {form.formState.errors.image2 && <p className="text-sm font-medium text-destructive">{form.formState.errors.image2.message as string}</p>}
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="transitionStyle">Transition Style</Label>
                        <Input id="transitionStyle" placeholder="e.g., Elegant, Casual, Edgy" {...form.register('transitionStyle')} />
                        {form.formState.errors.transitionStyle && <p className="text-sm font-medium text-destructive">{form.formState.errors.transitionStyle.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                         {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        {isLoading ? 'Generating...' : 'Generate Transition'}
                    </Button>
                </form>

                {result && (
                    <div className="mt-12">
                        <h3 className="font-headline text-2xl text-center font-bold mb-6">AI Generated Transition</h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {result.image ? (
                                <Image src={result.image} alt="Generated Transition" width={500} height={700} className="rounded-lg shadow-md object-cover mx-auto" />
                            ) : (
                                <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
                                  <p className="text-muted-foreground">No image generated.</p>
                                </div>
                            )}
                             <p className="text-lg text-muted-foreground italic bg-background p-6 rounded-lg">"{result.description}"</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
